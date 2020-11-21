using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System.Security.Claims;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SelectedLanguagesController : ControllerBase
    {
        private readonly ISelectedLanguagesRepository _selectedLanguagesRepository;

        public SelectedLanguagesController(ISelectedLanguagesRepository selectedLanguages)
        {
            _selectedLanguagesRepository = selectedLanguages;
        }

        [HttpPost]
        public ActionResult<Book> Add([FromBody] SelectedLanguages selectedLanguages)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var addedSelection = _selectedLanguagesRepository.Add(selectedLanguages);
            return Ok(addedSelection);
        }
    }
}
