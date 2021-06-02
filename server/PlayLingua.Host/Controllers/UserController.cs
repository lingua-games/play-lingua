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
                DisplayName = x.DisplayName,
                Id = x.Id,
                TotalScore = x.TotalScore
            }).ToList());
        }


        [HttpGet("get-user-information")]
        public ActionResult<UserViewModel> GetUserInformation()
        {
            try
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
                    DisplayName = repositoryResult.DisplayName,
                    Id = repositoryResult.Id,
                    TotalScore = repositoryResult.TotalScore,
                };

                if (repositoryResult.DefaultTargetLanguage != null)
                {
                    result.DefaultTargetLanguage = new LanguageViewModel
                    {
                        Id = repositoryResult.DefaultTargetLanguage.Id,
                        Name = repositoryResult.DefaultTargetLanguage.Name
                    };
                }
                if (repositoryResult.DefaultBaseLanguage != null)
                {
                    result.DefaultBaseLanguage = new LanguageViewModel
                    {
                        Id = repositoryResult.DefaultBaseLanguage.Id,
                        Name = repositoryResult.DefaultBaseLanguage.Name,
                    };
                }

                return Ok(result);
            }
            catch
            {

                return Unauthorized();
            }
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

        [HttpPost("reset-password")]
        public ActionResult<bool> ResetPassword([FromBody] UserViewModel model)
        {
            var user = GetUser();
            try
            {
                _userRepository.ResetPassword(new UserModel
                {
                    Password = model.Password,
                    Email = user.Email
                });

                var loginResult = _authRepository.Login(new Domain.Entities.User { Email = user.Email, Password = model.Password });
                loginResult.Token = _authRepository.GenerateToken(loginResult.User);
                return Ok(loginResult);
            }
            catch 
            {
                return Ok(new LoginResult { Message = "Failed to login", IsLogin = false }); ;
            }
        }

        [HttpPost("activate-user")]
        public ActionResult<ResultModel<UserViewModel>> ActivateUser([FromBody] UserViewModel model)
        {
            var result = new ResultModel<UserViewModel>
            {
                Success = true
            };
            try
            {
                var user = _userRepository.GetUserByActivationCode(model.EmailVerificationCode);
                if (user.IsEmailVerified == true)
                {
                    result.Success = false;
                    result.ErrorMessage = "Your account is already activated";
                } else
                {
                    result.Data = new UserViewModel
                    {
                        Email = user.Email
                    };
                    _userRepository.ActivateUser(new UserModel
                    {
                        EmailVerificationCode = model.EmailVerificationCode,
                        DisplayName = model.DisplayName,
                        Password = model.Password
                    });
                }
                return Ok(result);
            }
            catch
            {
                result.Success = false;
                result.ErrorMessage = "Server error";
                return Ok(result);
            }
        }

        [HttpPost]
        public ActionResult<RegisterUserViewModel> Add([FromBody] UserViewModel model)
        {
            var user = _userRepository.List().Where(x => x.Email == model.Email).FirstOrDefault();
            if (user != null && user.NeedsResetPassword)
            {
                _userRepository.ResetPassword(new UserModel
                {
                    Email = model.Email,
                    Password = "B49B4745-C694-4674-A7D8-0CA1585AB594"
                });
                var loginResult = _authRepository.Login(new User
                {
                    Email = model.Email,
                    Password = "B49B4745-C694-4674-A7D8-0CA1585AB594"
                });
                loginResult.Token = _authRepository.GenerateToken(loginResult.User);
                return Ok(new RegisterUserViewModel { Status = RegisterStatus.NeedsChangePassword, Token = loginResult.Token });
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
            model.Token = _authRepository.GenerateToken(new UserModel
            {
                Email = GetUser().Email,
                Id = GetUser().Id,
                DisplayName = model.DisplayName,
            });
            return Ok(model);
        }
    }
}
