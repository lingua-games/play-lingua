using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;

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

        [Authorize]
        [HttpPost("setDefaultLanguage")]
        public ActionResult SetDefaultSelection([FromBody] SelectDefaultLanguageViewModel model)
        {
            var userId = GetUser().Id;
            _selectedLanguagesRepository.SetDefaultLanguages(new SelectDefaultLanguageModel
            {
                DefaultBaseLanguage = model.BaseLanguage,
                DefaultTargetLanguage = model.TargetLanguage
            }, userId);
            return Ok();
        }
    }
}
