using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
using System.Linq;
using System.Security.Claims;

namespace PlayLingua.Host.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        public UserViewModel GetUser()
        {
            if(User == null)
            {
                return new UserViewModel();
            }
            return new UserViewModel
            {
                Id = User.Claims.Any(i => i.Type == ClaimTypes.NameIdentifier) ? int.Parse(this.User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value) : 0,
                Email = User.Claims.Any(i => i.Type == ClaimTypes.Email) ? this.User.Claims.First(i => i.Type == ClaimTypes.Email).Value : "",
                DisplayName = User.Claims.Any(i => i.Type == "displayName") ? this.User.Claims.First(i => i.Type == "displayName").Value : "",
            };
        }

    }
}
