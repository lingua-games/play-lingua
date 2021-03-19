using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Ports;
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
        public ActionResult<List<ChapterViewModel>> GetByLanguageId(int bookId)
        {
            return Ok(_chapterRepository.GetByBookId(bookId).Select(x => new ChapterViewModel
            {
                Id = x.Id,
                Name = x.Name,
                BookId = x.BookId,
                Description = x.Description,
            }).ToList());
        }
    }
}
