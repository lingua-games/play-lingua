using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PlayLingua.Host.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected User GetUser()
        {
            return new User
            {
                Id = this.User.Claims.Any(i => i.Type == ClaimTypes.NameIdentifier) ? int.Parse(this.User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value) : 0,
                Email = this.User.Claims.Any(i => i.Type == ClaimTypes.Email) ? this.User.Claims.First(i => i.Type == ClaimTypes.Email).Value: "",
            };
        }

    }
}
