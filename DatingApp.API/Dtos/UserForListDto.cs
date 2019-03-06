using System;

namespace DatingApp.API.Dtos
{
    //Copy the fields from Entity in Model -> User.cs
    //Then see what you want to keep and get rid off.
    //So like get rid of PasswordHash and Salt
    //Add extra stuff like instead of DateTime DateOfBirth send back int Age and string PhotoUrl
    //Then AutoMap User to UserForListDto..so easier , don't have to map one by one.
    public class UserForListDto  //User DTO is the API call for User information
    {
         public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl {get;set;}
    }
}