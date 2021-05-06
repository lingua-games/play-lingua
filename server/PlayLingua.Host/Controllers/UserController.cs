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
                DefaultTargetLanguage = x.DefaultTargetLanguage,
                DefaultBaseLanguage = x.DefaultBaseLanguage,
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
            return Ok(new UserViewModel
            {
                Email = repositoryResult.Email,
                BaseLanguages = repositoryResult.BaseLanguages,
                DefaultTargetLanguage = repositoryResult.DefaultTargetLanguage,
                DefaultBaseLanguage = repositoryResult.DefaultBaseLanguage,
                DisplayName = repositoryResult.DisplayName,
                Id = repositoryResult.Id,
                TargetLanguages = repositoryResult.TargetLanguages,
                TotalScore = repositoryResult.TotalScore
            });
        }

        [HttpPost]
        public ActionResult<UserViewModel> Add([FromBody] UserViewModel model)
        {
            if (_userRepository.List().Where(x => x.Email == model.Email).Any())
            {
                return StatusCode(406, "This email is already exist");
            }
            model.Id = _userRepository.Add(new User
            {
                Email = model.Email,
                Password = model.Password,
                DisplayName = model.DisplayName
            }).Id;
            return Ok(model);
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
