using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System.Collections.Generic;

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
        public ActionResult<List<Book>> List()
        {
            return Ok(_bookRepository.List());

        }

        [HttpGet("by-language/{id}")]
        public ActionResult<List<Book>> GetByLanguageId(int id)
        {
            return Ok(_bookRepository.GetByLanguage(id));
        }

        [HttpGet("by-source-and-target-language/{sourceLanguageId}/{targetLanguageId}")]
        public ActionResult<List<Book>> GetBySourceAndTargetLanguageId(int sourceLanguageId, int targetLanguageId)
        {
            return Ok(_bookRepository.GetBySourceAndTargetLanguageId(sourceLanguageId, targetLanguageId));
        }

        [HttpPost]
        public ActionResult<Book> Add([FromBody] Book book)
        {
            var addedBook = _bookRepository.Add(book, GetUser().Id);
            return Ok(addedBook);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            _bookRepository.Delete(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, Book book)
        {
            book.Id = id;
            _bookRepository.Update(book);
            return Ok(book);
        }

        //[HttpGet("{bookId}/chapters")]
        //public ActionResult<List<Chapter>> GetChapters(int bookId)
        //{
        //    var chapters = _chapterRepository.GetChapters(bookId);
        //    return Ok(chapters.Select(ChapterDto.Map));
        //}
    }
}
