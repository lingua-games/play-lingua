using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;

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
            _bookRepository    = bookRepository;
            _chapterRepository = chapterRepository;
        }

        [HttpGet]
        public ActionResult<List<Book>> Get()
        {
            var books = _bookRepository.GetBooks();
            return Ok(books);
        }

        [HttpGet("{bookId}/chapters")]
        public ActionResult<List<Chapter>> GetChapters(Guid bookId)
        {
            var chapters = _chapterRepository.GetChapters(bookId);
            return Ok(chapters);
        }
    }
}
