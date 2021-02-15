using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScoreStoreController : BaseController
    {
        private readonly IScoreRepository _scoreRepository;
        // private readonly IChapterRepository _chapterRepository;

        public ScoreStoreController(IScoreRepository scoreRepository)
        {
            _scoreRepository = scoreRepository;
        }


        [HttpPost]
        public ActionResult<Score> Add([FromBody] Score score)
        {
            var addedScore = _scoreRepository.Add(score, GetUser().Id);
            return Ok(addedScore);
        }
    }
}
