using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using System.Linq;
using System.Security.Claims;   

namespace PlayLingua.Host.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected User GetUser()
        {
            return new User
            {
                Id = User.Claims.Any(i => i.Type == ClaimTypes.NameIdentifier) ? int.Parse(this.User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value) : 0,
                Email = User.Claims.Any(i => i.Type == ClaimTypes.Email) ? this.User.Claims.First(i => i.Type == ClaimTypes.Email).Value: "",
            };
        }

    }
}
