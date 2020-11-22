using Microsoft.AspNetCore.Authorization;
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
    public class WordController : BaseController
    {
        private readonly IWordRepository _wordRepository;

        public WordController(IWordRepository wordRepository)
        {
            _wordRepository = wordRepository;
        }

        [HttpPost]
        public ActionResult<LanguageInquiryResult> InquiryAboutSelectedLanguages([FromBody] SelectedLanguageModel model)
        {
            var result = new LanguageInquiryResult
            {
                LanguageInformation = new List<LanguageInformation>()
            };
            foreach (var item in model.Base)
            {
                var language = new Language
                {
                    Id = item
                };
                var tableResult = _wordRepository.InquiryAboutSelectedLanguages(language);
                if (tableResult != null)
                {
                    result.LanguageInformation.Add(tableResult);
                }
            }
            if (result.LanguageInformation.Any())
            {
                result.HasWord = true;
            }
            return Ok(result);
        }

        //[HttpGet]
        //public ActionResult<List<Word>> List()
        //{
        //    try
        //    {
        //        return Ok(_wordRepository.List());

        //    }
        //    catch 
        //    {
        //        return Ok(_bookRepository.List());
        //    }                

        //}


        //[HttpDelete("{id}")]
        //public ActionResult Delete(string id)
        //{
        //    _bookRepository.Delete(id);
        //    return Ok();
        //}

        //[HttpPut("{id}")]
        //public ActionResult Update(int id, Book book)
        //{
        //    book.Id = id;
        //    _bookRepository.Update(book);
        //    return Ok(book);
        //}
    }
}
