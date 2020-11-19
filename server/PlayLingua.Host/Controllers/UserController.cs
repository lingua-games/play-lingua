using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System.Collections.Generic;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
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

        //[HttpGet("{bookId}/chapters")]
        //public ActionResult<List<Chapter>> GetChapters(int bookId)
        //{
        //    var chapters = _chapterRepository.GetChapters(bookId);
        //    return Ok(chapters.Select(ChapterDto.Map));
        //}
    }
}
