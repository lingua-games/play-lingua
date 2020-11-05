using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using PlayLingua.WebApi.Dto;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PlayLingua.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IChapterRepository _chapterRepository;

        public BooksController(IBookRepository bookRepository, IChapterRepository chapterRepository)
        {
            _bookRepository = bookRepository;
            _chapterRepository = chapterRepository;
        }

        [HttpGet]
        public ActionResult<List<Book>> List()
        {
            var books = _bookRepository.List();
            return Ok(books.Select(BookDto.Map));
        }

        [HttpPost]
        public ActionResult<Book> Add([FromBody] Book book)
        {
            var addedBook = _bookRepository.Add(book);
            return Ok(addedBook);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            _bookRepository.Delete(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult Update(Guid id, Book book)
        {
            var UpdatedBook = _bookRepository.Update(id, book);
            return Ok();
        }

        [HttpGet("{bookId}/chapters")]
        public ActionResult<List<Chapter>> GetChapters(Guid bookId)
        {
            var chapters = _chapterRepository.GetChapters(bookId);
            return Ok(chapters.Select(ChapterDto.Map));
        }


    }
}
