using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using System.Collections.Generic;
using System.Linq;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : BaseController
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthRepository _authRepository;

        public UserController(IUserRepository userRepository, IAuthRepository authRepository)
        {
            _userRepository = userRepository;
            _authRepository = authRepository;
        }

        [HttpGet]
        public ActionResult<List<UserViewModel>> List()
        {
            return Ok(_userRepository.List().Select(x => new UserViewModel
            {
                Email = x.Email,
                BaseLanguages = x.BaseLanguages,
                DefaultTargetLanguageId = x.DefaultTargetLanguageId,
                DefaultBaseLanguageId = x.DefaultBaseLanguageId,
                DisplayName = x.DisplayName,
                Id = x.Id,
                TargetLanguages = x.TargetLanguages,
                TotalScore = x.TotalScore
            }).ToList());
        }


        [HttpGet("get-user-information")]
        public ActionResult<UserViewModel> GetUserInformation()
        {
            var user = GetUser();
            if (user.Id == 0)
            {
                return Unauthorized();
            }
            var repositoryResult = _userRepository.GetUserInformation(user.Id);
            var result = new UserViewModel
            {
                Email = repositoryResult.Email,
                BaseLanguages = repositoryResult.BaseLanguages,
                DefaultTargetLanguage = new LanguageViewModel
                {
                    Id = repositoryResult.DefaultTargetLanguage.Id,
                    Name = repositoryResult.DefaultTargetLanguage.Name
                },
                DefaultBaseLanguage = new LanguageViewModel
                {
                    Id = repositoryResult.DefaultBaseLanguage.Id,
                    Name = repositoryResult.DefaultBaseLanguage.Name,
                },
                DisplayName = repositoryResult.DisplayName,
                Id = repositoryResult.Id,
                TargetLanguages = repositoryResult.TargetLanguages,
                TotalScore = repositoryResult.TotalScore,
                SelectedLanguages = new SelectedLanguagesViewModel
                {
                    TargetLanguages = repositoryResult?.SelectedLanguages?.TargetLanguages,
                    BaseLanguages = repositoryResult?.SelectedLanguages?.BaseLanguages
                }
            };
            return Ok(result);
        }

        [HttpPost("resend-activation-code")]
        public ActionResult<bool> ResendActivationCode([FromBody] UserViewModel model)
        {
            var user = _userRepository.List().Where(x => x.Email == model.Email).FirstOrDefault();
            var emailResult = _userRepository.SendVerificationCode(new UserModel
            {
                Email = model.Email,
                EmailVerificationCode = user.EmailVerificationCode
            });
            if (!emailResult)
            {
                return Ok(false);
            }
            return Ok(true);
        }

        [HttpPost]
        public ActionResult<RegisterUserViewModel> Add([FromBody] UserViewModel model)
        {
            var user = _userRepository.List().Where(x => x.Email == model.Email).FirstOrDefault();
            if (user != null && user.NeedsResetPassword)
            {
                return Ok(new RegisterUserViewModel { Status = RegisterStatus.NeedsChangePassword });
            }
            else if (user != null && (user.IsEmailVerified == null || user.IsEmailVerified == false))
            {
                _userRepository.SendVerificationCode(new UserModel
                {
                    Email = user.Email,
                    EmailVerificationCode = user.EmailVerificationCode
                });
                return Ok(new RegisterUserViewModel() { Status = RegisterStatus.EmailSent });
            }
            else if (user != null)
            {
                return Ok(new RegisterUserViewModel() { Status = RegisterStatus.AlreadyRegistered });
            }

            _userRepository.Add(new User
            {
                Email = model.Email,
            });
            return Ok(new RegisterUserViewModel() { Status = RegisterStatus.EmailSent });
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            _userRepository.Delete(id);
            return Ok();
        }

        [HttpPut("update")]
        public ActionResult<EditUserViewModel> Update(EditUserViewModel model)
        {
            if (model.IsChangingPassword)
            {
                var loginResult = _authRepository.Login(new User
                {
                    Email = GetUser().Email,
                    Password = model.CurrentPassword
                });
                if (!loginResult.IsLogin)
                {
                    return StatusCode(406, "The entered current password is not correct.");
                }
            }
            _userRepository.Update(new EditUserModel
            {
                DisplayName = model.DisplayName,
                IsChangingPassword = model.IsChangingPassword,
                NewPassword = model.NewPassword
            });
            model.Token = _authRepository.GenerateToken(new User
            {
                Email = GetUser().Email,
                Id = GetUser().Id,
                DisplayName = model.DisplayName,
            });
            return Ok(model);
        }
    }
}
