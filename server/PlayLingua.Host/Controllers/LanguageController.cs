using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
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
        public ActionResult<List<LanguageViewModel>> List()
        {
            return Ok(_languageRepository.List().Select(x => new LanguageViewModel
            {
                Code = x.Code,
                FullName = x.FullName,
                Id = x.Id,
                Name = x.Name,
                NativeName = x.NativeName
            }).ToList());
        }

        [HttpPost]
        public ActionResult<LanguageViewModel> Add([FromBody] List<LanguageViewModel> model)
        {
            var result = new List<LanguageViewModel>();
            foreach (var item in model)
            {
                item.Id = _languageRepository.Add(new Language
                {
                    Code = item.Code,
                    FullName = item.FullName,
                    NativeName = item.NativeName,
                    Name = item.NativeName
                }).Id;
                result.Add(item);
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
        public ActionResult<LanguageViewModel> Update(int id, LanguageViewModel model)
        {
            _languageRepository.Update(new Language
            {
                Id = id,
                Code = model.Code,
                Name = model.Name,
                FullName = model.FullName,
                NativeName = model.NativeName
            });
            return Ok(model);
        }
    }
}
