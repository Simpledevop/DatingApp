using System.Collections.Generic;
using System.Reflection.Emit;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    //Repository sits between Business Layer and Database Layer
    //Allows a seperation where can write in own implementation and switch it out (fashion and DB changes)
    //Seperation of concerns, controller doesn't have the logic to mess with, keeps it clean.
    //Interface allows when writing Tests, to make it Mockable and write own test implementation of data to return.
    //IRepository to say what type of Dating Operations onto the Database there will be.
    public interface IDatingRepository
    {
         //Add, Delete, GetUsers, GetSingleUser, SaveChanges, 

        //Add a type of T
        //T in this case is going to be a type of User or type of Photo
        //and it expects T as an entity passed into 'hint name entity'
        //The 'where' is to constraint the T to just a class type
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll(); //Save all as there either be zero changes to save or one or more changes to save back to Database,
                              // if more than one return true, else return false for nothing to save (or something went wrong).
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);
    }
}