using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    //Implementing the IDatingRepository. Concrete implementation of the type of Dating Operations onto the Database there will be
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;

        public DatingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            //These will be saved into memory and not commited to Datbase...until we call SaveAll()
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            //We want to include Photos
            //Our Photos were considered navigation property
            //Whilst we did have Photo collection in User class
            //This won't be automatically included because it's a navigation property. 
            //So when you get User and look at Photos , it will be NULL
            //Include WILL tell EF to INCLUDE it.
            //Then we see the Photos.
            //This is called 'Loading on Demand'

            //ALSO : When you add virtual to the ICollection 'virtual ICollection<Photo> Photo'
            //This is called 'Lazy Loading', only when you load up the User then
            //first access the collection of Photos (drill into Photo navigation property) 
            //you will then see Photos.

            //FirstOrDefaultAsync if we find none is Null returned.
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.Photos).ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0; //If this return 1,2,3 this is number of records written(updated/added) to Database
        }
    }
}