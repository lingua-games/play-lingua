using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
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
        public ActionResult<List<RankResultModel>> Add([FromBody] Score score)
        {
            var result = new List<RankResultModel>();
            score.UserId = GetUser().Id;
            var addedScore = _scoreRepository.Add(score, GetUser().Id);
            _scoreRepository.IncreaseScore(score.score, score.UserId);
            result.Add(new RankResultModel
            {
                Email = GetUser().Email,
                DisplayName = GetUser().DisplayName,
                Score = score.score
            });

            result = _scoreRepository.GetTopRanks(addedScore);
            return Ok(result);
        }
    }
}
