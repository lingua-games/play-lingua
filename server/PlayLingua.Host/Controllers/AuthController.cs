using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        // private readonly IChapterRepository _chapterRepository;

        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost]
        public ActionResult<User> Add([FromBody] User user)
        {
            var result = _authRepository.Login(user);
            if (result.IsLogin)
            {
                result.Token = _authRepository.GenerateToken(result.User.Id);
            }
             
            return Ok(result);
        }
    }
}
