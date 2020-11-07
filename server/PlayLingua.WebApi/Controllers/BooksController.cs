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

        public BooksController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet]
        public ActionResult<List<Book>> List()
        {
            return Ok(_bookRepository.List());
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
