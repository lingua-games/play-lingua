using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
using PlayLingua.Domain.Ports;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost]
        public ActionResult<LoginResultViewModel> Login([FromBody] UserViewModel model)
        {
            var result = new LoginResultViewModel();
            var loginResult = _authRepository.Login(new User
            {
                Email = model.Email,
                Password = model.Password
            });
            result.IsLogin = loginResult.IsLogin;

            if (result.IsLogin)
            {
                result.User = new UserViewModel
                {
                    Email = loginResult.User.Email,
                    Id = loginResult.User.Id,
                    DisplayName = loginResult.User.DisplayName,
                    BaseLanguages = loginResult.User.BaseLanguages,
                    TargetLanguages = loginResult.User.TargetLanguages,
                    DefaultBaseLanguage = loginResult.User.DefaultBaseLanguage,
                    DefaultTargetLanguage = loginResult.User.DefaultTargetLanguage,
                    TotalScore = loginResult.User.TotalScore,
                    IsSelectedLanguages = loginResult.User.IsSelectedLanguages
                };
                result.Token = _authRepository.GenerateToken(loginResult.User);
            } else
            {
                result.Message = loginResult.Message;
            }

            return Ok(result);
        }
    }
}
