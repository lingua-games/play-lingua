using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
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
        // private readonly IChapterRepository _chapterRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public ActionResult<List<User>> List()
        {
            try
            {
                return Ok(_userRepository.List());

            }
            catch
            {
                return Ok(_userRepository.List());
            }
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

        [HttpPut("{id}")]
        public ActionResult Update(int id, User user)
        {
            user.Id = id;
            _userRepository.Update(user);
            return Ok(user);
        }
    }
}
