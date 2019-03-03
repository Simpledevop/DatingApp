using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext() { }// DbContextOptions options) : base (options) {}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // lets us use the configuration file as an object
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            // from the configuration object, get the connection string as the DataContext connection.
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));

            // EF MIGRATIONS - in terminal 'dotnet ef migrations add ExtendedUserClass'  because you added extra Entity fields 
            // and a new 'Photo.cs' and added the DBSet<Photo> below.
            // Then you see the 'ExtendedUserClass.cs' under Migrations gets created and in it has script to create the table and new entity fields into the DB.

            // Type 'dotnet ef' ...to see ef migration help ...then with the commands for help , e.g. 'dotnet ef migration --help' ..then can see 'Add a new migration'
            // 'Remove last migration', 'Generate a SQL script from the migrations'.
            // Note there is also a __EFMigrationsHistory table that tells you what migrations have ran so far against the DB.
        }

        public DbSet<Value> Values {get;set;}
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}