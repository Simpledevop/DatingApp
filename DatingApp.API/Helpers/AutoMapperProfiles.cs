using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    //Automapper uses Profile to help it understand the Source and Destination of what it's mapping.
    public class AutoMapperProfiles : Profile //To use Automapper methods , inherit methods from Profile Class.
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()

                .ForMember(dest => dest.PhotoUrl, opt => {  //For destination PhotoURL
                    opt.MapFrom( src => src.Photos.FirstOrDefault(p => p.IsMain).Url); //Specify where you want to get the property from for the PhotoURL
                }) //This allows us to customize a configuration for a member on our destination object UserForListDto
                .ForMember(dest => dest.Age, opt => { opt.MapFrom((d,s) => d.DateOfBirth.CalculateAge());//Resolve using will use a custom value call back - allows own call back method on it
                });
            CreateMap<User, UserForDetailedDto>()  //Do same mapping options for User to UserForDetailedDto
                .ForMember(dest => dest.PhotoUrl, opt => {  
                    opt.MapFrom( src => src.Photos.FirstOrDefault(p => p.IsMain).Url); 
                }) 
                .ForMember(dest => dest.Age, opt => { opt.MapFrom((d,s) => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Photo, PhotoForDetailedDto>();           
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
        }
    }
}