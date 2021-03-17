using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System.Collections.Generic;
using System.Linq;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LanguageController : BaseController
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
            var result = new List<Language>();
            foreach (var item in language)
            {
                result.Add(_languageRepository.Add(item));
            }
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            _languageRepository.Delete(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult<Language> Update(int id, Language language)
        {
            language.Id = id;
            _languageRepository.Update(language);
            return Ok(language);
        }
    }
}
