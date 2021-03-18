using Microsoft.AspNetCore.Mvc;
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
        public ActionResult<List<User>> List()
        {
                return Ok(_userRepository.List());
        }


        [HttpGet("get-user-information")]
        public ActionResult<User> GetUserInformation()
        {
            return Ok(_userRepository.GetUserInformation(GetUser().Id));
        }

        [HttpPost]
        public ActionResult<User> Add([FromBody] User user)
        {
            if (_userRepository.List().Where(x => x.Email == user.Email).Any())
            {
                return StatusCode(406, "This email is already exist");
            }
            var addedUser = _userRepository.Add(user);
            return Ok(addedUser);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            _userRepository.Delete(id);
            return Ok();
        }

        [HttpPut("update")]
        public ActionResult<string>Update(EditUserModel user)
        {
            user.Id = GetUser().Id;

            if (user.IsChangingPassword)
            {
                var loginResult = _authRepository.Login(new Domain.Entities.User
                {
                    Email = GetUser().Email,
                    Password = user.CurrentPassword
                });
                if (!loginResult.IsLogin)
                {
                    return StatusCode(406, "The entered current password is not correct.");
                }
            }
            _userRepository.Update(user);
            user.Token = _authRepository.GenerateToken(new User()
            {
                Email = GetUser().Email,
                Id = GetUser().Id,
                DisplayName = user.DisplayName,
            });
            return Ok(user);
        }
    }
}
