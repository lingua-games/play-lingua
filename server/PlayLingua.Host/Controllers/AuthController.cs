using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
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
                    IsAdmin = loginResult.User.IsAdmin,
                    TotalScore = loginResult.User.TotalScore,
                };

                if (loginResult.User.DefaultBaseLanguage != null)
                {
                    result.User.DefaultBaseLanguage = new LanguageViewModel
                    {
                        Id = loginResult.User.DefaultBaseLanguage.Id,
                        Code = loginResult.User.DefaultBaseLanguage.Code,
                        FullName = loginResult.User.DefaultTargetLanguage.FullName,
                        Name = loginResult.User.DefaultBaseLanguage.Name,
                        NativeName = loginResult.User.DefaultBaseLanguage.NativeName,
                    };
                }
                if (loginResult.User.DefaultTargetLanguage != null)
                {
                    result.User.DefaultTargetLanguage = new LanguageViewModel
                    {
                        Id = loginResult.User.DefaultTargetLanguage.Id,
                        Code = loginResult.User.DefaultTargetLanguage.Code,
                        FullName = loginResult.User.DefaultTargetLanguage.FullName,
                        Name = loginResult.User.DefaultTargetLanguage.Name,
                        NativeName = loginResult.User.DefaultTargetLanguage.NativeName,
                    };
                }
                result.Token = _authRepository.GenerateToken(loginResult.User);
            }
            else
            {
                result.Message = loginResult.Message;
            }

            return Ok(result);
        }
    }
}
