using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Linq;

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

            if (score.UserId != 0)
            {
                var addedScore = _scoreRepository.Add(score, GetUser().Id);
                _scoreRepository.IncreaseScore(score.score, score.UserId);
            }

            result.Add(new RankResultModel
            {
                Email = score.UserId != 0 ? GetUser().Email : "You",
                DisplayName = score.UserId != 0 ? GetUser().DisplayName : "You",
                Score = score.score
            });

            result.AddRange(_scoreRepository.GetTopRanks(score));
            return Ok(result.Take(5));
        }
    }
}
