using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
using PlayLingua.Domain.Ports;
using System.Collections.Generic;
using System.Linq;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScoreStoreController : BaseController
    {
        private readonly IScoreRepository _scoreRepository;

        public ScoreStoreController(IScoreRepository scoreRepository)
        {
            _scoreRepository = scoreRepository;
        }


        [HttpPost]
        public ActionResult<List<RankResultViewModel>> Add([FromBody] ScoreViewModel model)
        {
            var result = new List<RankResultViewModel>();

            if (model.UserId != 0)
            {
                _scoreRepository.Add(new Score
                {
                    UserId = GetUser().Id,
                    GuestCode = model.GuestCode,
                    GameName = model.GameName,
                    BookId = model.BookId,
                    ChapterId = model.ChapterId,
                    AddedDate = model.AddedDate,
                    score = model.score
                }, GetUser().Id);

                _scoreRepository.IncreaseScore(model.score, GetUser().Id);
            }

            result.Add(new RankResultViewModel
            {
                Email = model.UserId != 0 ? GetUser().Email : "You",
                DisplayName = model.UserId != 0 ? GetUser().DisplayName : "You",
                Score = model.score
            });

            result.AddRange(_scoreRepository.GetTopRanks(score));
            return Ok(result.Take(5).ToList());
        }
    }
}
