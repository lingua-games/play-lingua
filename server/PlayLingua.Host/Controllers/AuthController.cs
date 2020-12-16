using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;

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
        public ActionResult<User> Login([FromBody] User user)
        {
            var result = _authRepository.Login(user);
            if (result.IsLogin)
            {
                result.Token = _authRepository.GenerateToken(result.User);
            }
             
            return Ok(result);
        }
    }
}
