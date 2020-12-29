using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
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
        private readonly IBookRepository _bookRepository;
        private readonly IChapterRepository _chapterRepository;

        public WordController(IWordRepository wordRepository, IBookRepository bookRepository, IChapterRepository chapterRepository)
        {
            _wordRepository = wordRepository;
            _bookRepository = bookRepository;
            _chapterRepository = chapterRepository;
        }

        [HttpPost("inquiry-about-selected-language")]
        public ActionResult<bool> InquiryAboutSelectedLanguages([FromBody] SelectedLanguageModel model)
        {
            return Ok(_wordRepository.InquiryAboutSelectedLanguages(model));
        }

        [HttpPost("submit-word-series")]
        [Authorize]
        public ActionResult SubmitWordSeries([FromBody] SubmitWordsModel model)
        {
            var userId = GetUser().Id;
            if (model.IsRandom == "book")
            {
                if (model.Book.Id == 0)
                {
                    model.Book = _bookRepository.Add(model.Book, userId);

                    if (model.Chapter != null)
                    {
                        model.Chapter =  _chapterRepository.Add(new Chapter
                        {
                            Name = model.Chapter.Name,
                            BookId = model.Book.Id,
                        }, userId);
                    }
                }
            }
            _wordRepository.SubmitWordSeries(model, userId);
            return Ok();
        }
    }
}
