using System;
using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.API.Controllers {
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public UsersController (IDatingRepository repo, IMapper mapper) {
            _repo = repo;
            _mapper = mapper;
        }
        //http://localhost:5000/api/Users
        [HttpGet]
        public async Task<IActionResult> GetUsers() {
            var users = await _repo.GetUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

             JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings //This is to handle self referencing objects in entity. e.g, user -> photo -> user etc circular 
                                                                                        //tried to add it to startup.cs so it's globally applied, but .net core 3 preview doesn't seem
                                                                                        // to like it, oh well...this is ok for now. 
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };

           //This make the properties all lowercase as for some reason when in a List they start with camelCase (first Letter caps) and don't want this , we want all lowercase for typescript deserialisation into typscript object types.
            jsonSerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            var usersJsonSeralized =  JsonConvert.SerializeObject(usersToReturn, jsonSerializerSettings);
            
            return Ok(usersJsonSeralized); 
        } 

        //http://localhost:5000/api/Users/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id) {
            var user = await _repo.GetUser(id);

            //So we don't want to return the User with the PasswordHash and PasswordSalt in it
            //<Destination> to (Source)
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings //This is to handle self referencing objects in entity. e.g, user -> photo -> user etc circular  
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };

            var userJsonSeralized =  JsonConvert.SerializeObject(userToReturn, jsonSerializerSettings);
            
            return Ok(userToReturn);
       }

        //Stackoverlow says HTTP Put used when replacing the whole object and HTTP Patch used when updating some data
       [HttpPut("{id}")]
       public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
       {
           // Check if the current user has passed the token up to the server and attempting to access this route {id}, doing an httpPut
           // and if the id doesn't match what's in their token, then return unauthorised.
           // So the person making the Request has an ID that was issued within the creation of the first JWT token and then token passed to
           // them after they login. So make sure the ID they want to update is the same as they have (serialised into Claim object) to make sure
           // the requester can only update their own user.
           if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
           {
               return Unauthorized();
           }

           var userFromRepo = await _repo.GetUser(id);

           // This will map dto changes into the entity ( we called it model here)
            _mapper.Map(userForUpdateDto, userFromRepo);

            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating user {id} failed on save");
       }
    }
}