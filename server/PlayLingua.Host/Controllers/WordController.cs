using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
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
        private readonly IBookRepository _bookRepository;
        private readonly IChapterRepository _chapterRepository;

        public WordController(IWordRepository wordRepository, IBookRepository bookRepository, IChapterRepository chapterRepository)
        {
            _wordRepository = wordRepository;
            _bookRepository = bookRepository;
            _chapterRepository = chapterRepository;
        }

        [HttpPost("inquiry-about-selected-language")]
        public ActionResult<bool> InquiryAboutSelectedLanguages([FromBody] SelectedLanguageViewModel model)
        {
            return Ok(_wordRepository.InquiryAboutSelectedLanguages(new SelectedLanguageModel
            {
                Base = model.Base,
                Target = model.Target
            }));
        }

        [HttpPost("submit-word-series")]
        [Authorize]
        public ActionResult SubmitWordSeries([FromBody]SubmitWordsViewModel model)
        {
            var userId = GetUser().Id;
            if (model.IsRandom == "book")
            {
                if (model.Book.Id == 0)
                {
                    model.Book.Id = _bookRepository.Add(new Book
                    {
                        Name = model.Book.Name,
                        TargetLanguageId = model.Book.TargetLanguageId,
                        BaseLanguageId = model.Book.BaseLanguageId
                    }, userId).Id;

                    if (model.Chapter != null)
                    {
                        model.Chapter.Id = _chapterRepository.Add(new Chapter
                        {
                            Name = model.Chapter.Name,
                            BookId = model.Book.Id,
                        }, userId).Id;
                    }
                }

                if (model.Chapter?.Id == 0)
                {
                    model.Chapter.Id = _chapterRepository.Add(new Chapter
                    {
                        Name = model.Chapter.Name,
                        BookId = model.Book.Id,
                    }, userId).Id;
                }
            }
            _wordRepository.SubmitWordSeries(new SubmitWordsModel
            {
                BaseLanguage = new NameIdModel { Id = model.BaseLanguage.Id, Name = model.BaseLanguage.Name },
                TargetLanguage = new NameIdModel { Id = model.TargetLanguage.Id, Name = model.TargetLanguage.Name },
                Book = new Book { Id = model.Book.Id },
                Chapter = new Chapter { Id = model.Chapter.Id },
                Words = model.Words.Select(x => new FormWords
                {
                    Base = new FormWord { Value = x.Base.Value },
                    Targets = x.Targets.Select(y => new FormWord { Value = y.Value }).ToList()
                }).ToList()
            }, userId);
            return Ok();
        }

        [HttpPost("edit-word-series")]
        [Authorize]
        public ActionResult EditWordSeries([FromBody] SubmitWordsViewModel model)
        {
            int userId = GetUser().Id;
            if (model.IsRandom == "book")
            {
                if (model.Book.Id == 0)
                {
                    model.Book.Id = _bookRepository.Add(new Book
                    {
                        Name = model.Book.Name,
                        TargetLanguageId = model.Book.TargetLanguageId,
                        BaseLanguageId = model.Book.BaseLanguageId
                    }, userId).Id;

                    if (model.Chapter != null)
                    {
                        model.Chapter.Id = _chapterRepository.Add(new Chapter
                        {
                            Name = model.Chapter.Name,
                            BookId = model.Book.Id,
                        }, userId).Id;
                    }
                }

                if (model.Chapter?.Id == 0)
                {
                    model.Chapter.Id = _chapterRepository.Add(new Chapter
                    {
                        Name = model.Chapter.Name,
                        BookId = model.Book.Id,
                    }, userId).Id;
                }
            }
            _wordRepository.EditWordSeries(new SubmitWordsModel
            {
                BaseLanguage = new NameIdModel { Id = model.BaseLanguage.Id, Name = model.BaseLanguage.Name },
                TargetLanguage = new NameIdModel { Id = model.TargetLanguage.Id, Name = model.TargetLanguage.Name },
                Book = new Book { Id = model.Book.Id },
                Chapter = new Chapter { Id = model.Chapter.Id },
                Words = model.Words.Select(x => new FormWords
                {
                    Base = new FormWord { Value = x.Base.Value },
                    Targets = x.Targets.Select(y => new FormWord { Value = y.Value }).ToList()
                }).ToList()
            }, userId);
            return Ok();
        }

        [HttpGet("get-word-overviews")]
        [Authorize]
        public ActionResult<List<WordOverviewViewModel>> GetWordOverviews()
        {
            return Ok(_wordRepository.GetWordOverviews(GetUser().Id).Select(x => new WordOverviewViewModel
            {
                BaseLanguageId = x.BaseLanguageId,
                BaseLanguageName = x.BaseLanguageName,
                BookId = x.BookId,
                BookName = x.BookName,
                ChapterId = x.ChapterId,
                ChapterName = x.ChapterName,
                Count = x.Count,
                TargetLanguageId = x.TargetLanguageId,
                LastUpdateDate = x.LastUpdateDate != null ? x.LastUpdateDate : x.AddedDate,
                TargetLanguageName = x.TargetLanguageName
            }).ToList());
        }

        [HttpPost("get-word-details")]
        [Authorize]
        public ActionResult<List<WordOverviewViewModel>> GetWordDetails([FromBody] WordOverviewViewModel model)
        {
            return Ok(_wordRepository.GetWordDetails(new WordOverviewModel {
                AddedBy = GetUser().Id,
                BaseLanguageId = model.BaseLanguageId,
                BookId = model.BookId,
                ChapterId = model.ChapterId,
                TargetLanguageId = model.TargetLanguageId
            }).Select(x => new WordViewModel
            {
                 Id = x.Id,
                 BaseWord = x.BaseWord,
                 Translate = x.Translate
            }).ToList());
        }
    }
}
