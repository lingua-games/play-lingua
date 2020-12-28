using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PlayLingua.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChaptersController : ControllerBase
    {
        private readonly IChapterRepository _chapterRepository;

        public ChaptersController(IChapterRepository chapterRepository)
        {
            _chapterRepository = chapterRepository;
        }

        [HttpGet("by-book/{bookId}")]
        public ActionResult<List<Chapter>> GetByLanguageId(int bookId)
        {
            return Ok(_chapterRepository.GetByBookId(bookId));
        }
    }
}
