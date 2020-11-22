using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System.Security.Claims;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SelectedLanguagesController : BaseController
    {
        private readonly ISelectedLanguagesRepository _selectedLanguagesRepository;

        public SelectedLanguagesController(ISelectedLanguagesRepository selectedLanguages)
        {
            _selectedLanguagesRepository = selectedLanguages;
        }

        [HttpPost]
        public ActionResult<Book> Add([FromBody] SelectedLanguages selectedLanguages)
        {
            selectedLanguages.UserId = GetUser().Id;
            var addedSelection = _selectedLanguagesRepository.Add(selectedLanguages);
            return Ok(addedSelection);
        }
    }
}
