using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DatingApp.API.Controllers {
    //[Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase {
        private readonly IDatingRepository _repo;
        public UsersController (IDatingRepository repo) {
            _repo = repo;

        }
        //http://localhost:5000/api/Users
        [HttpGet]
        public async Task<IActionResult> GetUsers() {
            var users = await _repo.GetUsers();

             JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings //This is to handle self referencing objects in entity. e.g, user -> photo -> user etc circular 
                                                                                        //tried to add it to startup.cs so it's globally applied, but .net core 3 preview doesn't seem
                                                                                        // to like it, oh well...this is ok for now. 
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };

            var usersJsonSeralized =  JsonConvert.SerializeObject(users, jsonSerializerSettings);
            return Ok(usersJsonSeralized); 
        } 

        //http://localhost:5000/api/Users/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id) {
            var user = await _repo.GetUser(id);

            JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings //This is to handle self referencing objects in entity. e.g, user -> photo -> user etc circular  
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };

            var userJsonSeralized =  JsonConvert.SerializeObject(user, jsonSerializerSettings);
            return Ok(userJsonSeralized);
       }
    }
}