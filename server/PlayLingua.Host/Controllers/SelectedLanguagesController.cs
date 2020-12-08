using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        public ActionResult<SelectedLanguages> Add([FromBody] SelectedLanguages selectedLanguages)
        {
            selectedLanguages.UserId = GetUser().Id;
            var addedSelection = new SelectedLanguages();
            var selectedLanguageByUserId = _selectedLanguagesRepository.GetByUserId(selectedLanguages.UserId);
            if (selectedLanguageByUserId == null)
            {
                addedSelection = _selectedLanguagesRepository.Add(selectedLanguages);
            }
            else
            {
                selectedLanguages.Id = selectedLanguageByUserId.Id;
                _selectedLanguagesRepository.Update(selectedLanguages);
            }

            return Ok(addedSelection);
        }
    }
}
