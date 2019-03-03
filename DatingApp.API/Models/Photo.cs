using System;

namespace DatingApp.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }

        //By referencing back to User - EF Convention makes it a cascade delete
        //So when User is deleted the Photos will be deleted.
        //Otherwise EF would of had a 'onDelete: ReferentialAction.Restrict' which would
        //mean you can't delete the User if a related Photo existed, which would mean
        //we would manually have to delete the Photo first then the User (hence Restrict) Ouch...long winded.
        public User User { get; set; }
        public int UserId { get; set; }

    }
}