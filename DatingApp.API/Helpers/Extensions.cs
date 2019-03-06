using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            //So in the event of an exeption there will be new headers returned in the response.
            response.Headers.Add("Application-Error", message); //will have the error message in the header too.. & other headers below, allow the error to be displayed.
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error"); 
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year;
            if(theDateTime.AddYears(age) > DateTime.Today)
                age--;
            return age;
        }
    }
}