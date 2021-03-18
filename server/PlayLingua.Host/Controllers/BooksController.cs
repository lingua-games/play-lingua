using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : BaseController
    {
        private readonly IBookRepository _bookRepository;
        // private readonly IChapterRepository _chapterRepository;

        public BooksController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet]
        public ActionResult<List<BookModel>> List()
        {
            return Ok(_bookRepository.List().Select(x => new BookModel
            {
                Id = x.Id,
                Name = x.Name,
                SourceLanguageId = x.SourceLanguageId,
                TargetLanguageId = x.TargetLanguageId
            }).ToList());
        }

        [HttpGet("by-language/{id}")]
        public ActionResult<List<BookModel>> GetByLanguageId(int id)
        {
            return Ok(_bookRepository.GetByLanguage(id).Select(x => new BookModel
            {
                Id = x.Id,
                Name = x.Name,
                SourceLanguageId = x.SourceLanguageId,
                TargetLanguageId = x.TargetLanguageId
            }).ToList());
        }

        [HttpGet("by-source-and-target-language/{sourceLanguageId}/{targetLanguageId}")]
        public ActionResult<List<BookModel>> GetBySourceAndTargetLanguageId(int sourceLanguageId, int targetLanguageId)
        {
            return Ok(_bookRepository.GetBySourceAndTargetLanguageId(sourceLanguageId, targetLanguageId).Select(x => new BookModel
            {
                Id = x.Id,
                Name = x.Name,
                SourceLanguageId = x.SourceLanguageId,
                TargetLanguageId = x.TargetLanguageId
            }).ToList());
        }

        [HttpPost]
        public ActionResult<BookModel> Add([FromBody] BookModel model)
        {
            var addedBook = _bookRepository.Add(new Book
            {
                Name = model.Name,
                SourceLanguageId = model.SourceLanguageId,
                TargetLanguageId = model.TargetLanguageId
            }, GetUser().Id);
            return Ok(addedBook);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            _bookRepository.Delete(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult<BookModel> Update(int id, BookModel model)
        {
            _bookRepository.Update(new Book
            {
                Id = id,
                Name = model.Name,
                SourceLanguageId = model.SourceLanguageId,
                TargetLanguageId = model.TargetLanguageId
            });
            return Ok(model);
        }

    }
}
