using System.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace DatingApp.API.Controllers
{
    [Authorize]
    //http://localhost:5000/api/values
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase // ControllerBase is MVC without View support as Angular will be View support.
    {
        private readonly DataContext _context;

        public ValuesController(DataContext context )
        {
            this._context = context;
            
        }
        //async methods are different than normal methods.Whatever you return from async methods are wrapped in a Task.
        //If you return no value(void) it will be wrapped in Task, If you return int it will be wrapped in Task<int> and so on.

        //async lets this method be multithreaded...e.g, synchronous..you know from debugging you call it twice..it waits till you have exited the method (thread is free).
        //async lets multi-calls access it on their own threads - so no blocking ..stream through..instead of queing and waiting for it to complete (e.g, what if had large common computation...then it will belong wait).
        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Getvalues()
        {
            var values = await  _context.Values.ToListAsync();
            //will compile without await and values will be Task<List<Model.Value>>
            //and with await it just List<Model.Value> but C# compiler will wrap it with Task<> on return.
            //await just stop the process till got the result back and then can use the result value in code below it.
            return Ok(values);
        }

        [AllowAnonymous]
        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult GetValue(int id)
        {
            var value = _context.Values.FirstOrDefault(x => x.Id == id);

            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
