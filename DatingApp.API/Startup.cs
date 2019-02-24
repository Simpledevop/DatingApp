using System.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using DatingApp.API.Helpers;

namespace DatingApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>();
            
            services.AddMvc().AddNewtonsoftJson();

            services.AddCors();
            
            services.AddScoped<IAuthRepository, AuthRepository>();

            //Specify the Authentication Scheme our system is going to use - in this case we say JWT.
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    //To decode the Hashed Secret our side when the client calls into the Controller with Authorize we can use the Secret Key to decode it
                    //This is the same key that was used to encode it in the first place
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder => { //Adds middleware to the pipeline that catches the exception, logs them, but then re-excutes the request in another pipeline
                        builder.Run(async context => {
                            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                            var error = context.Features.Get<IExceptionHandlerFeature>();

                            if (error != null)
                            {
                                context.Response.AddApplicationError(error.Error.Message);
                                //When in production you under Properties -> launchSettings.json -> ASPNETCORE_ENVIRONMENT: Production , instead of Development
                                //You would not get an error passed out to the Response 'none in Postman or Console of the HttpResponse' to see it do the the line below.
                                await context.Response.WriteAsync(error.Error.Message); //Writing the error message into the http response aswell.
                            }
                        }); 
                });
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseRouting(routes =>
            {
                routes.MapApplication();
            });
            //Users are authorized through their JWT Token
            app.UseAuthentication();
            //Allows Authorize attribute on top of controllers & actions.
            app.UseAuthorization();
        }
    }
}
