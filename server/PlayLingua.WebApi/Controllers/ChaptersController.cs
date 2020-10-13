using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;

namespace PlayLingua.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChaptersController : ControllerBase
    {
        private readonly IWordRepository _wordRepository;

        public ChaptersController(IWordRepository wordRepository)
        {
            _wordRepository = wordRepository;
        }

        [HttpGet("{chapterId}/words")]
        public ActionResult<List<Word>> Words(Guid chapterId)
        {
            var words = _wordRepository.GetWords(chapterId);
            return Ok(words);
        }
    }
}
