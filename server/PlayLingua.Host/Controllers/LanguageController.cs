using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System.Collections.Generic;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LanguageController : ControllerBase
    {
        private readonly ILanguageRepository _languageRepository;

        public LanguageController(ILanguageRepository languageRepository)
        {
            _languageRepository = languageRepository;
        }

        [HttpGet]
        public ActionResult<List<Language>> List()
        {
            return Ok(_languageRepository.List());
        }

        [HttpPost]
        public ActionResult<Language> Add([FromBody] List<Language> language)
        {
            foreach (var item in language)
            {
                var addedLanguage = _languageRepository.Add(item);
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            _languageRepository.Delete(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, Language language)
        {
            language.Id = id;
            _languageRepository.Update(language);
            return Ok(language);
        }
    }
}
