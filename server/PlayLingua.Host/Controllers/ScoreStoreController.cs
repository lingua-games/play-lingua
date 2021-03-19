using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
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
        public ActionResult<List<RankResultViewModel>> Add([FromBody] UserScoreViewModel model)
        {
            var result = new List<RankResultViewModel>();

            if (model.UserId != 0)
            {
                _scoreRepository.Add(new UserScore
                {
                    UserId = GetUser().Id,
                    GuestCode = model.GuestCode,
                    GameName = model.GameName,
                    BookId = model.BookId,
                    ChapterId = model.ChapterId,
                    AddedDate = model.AddedDate,
                    Score = model.Score
                }, GetUser().Id);

                _scoreRepository.IncreaseScore(model.Score, GetUser().Id);
            }

            result.Add(new RankResultViewModel
            {
                Email = model.UserId != 0 ? GetUser().Email : "You",
                DisplayName = model.UserId != 0 ? GetUser().DisplayName : "You",
                Score = model.Score
            });

            result.AddRange(_scoreRepository.GetTopRanks(new UserScore
            {
                GameName = model.GameName,
                BookId = model.BookId,
                ChapterId = model.ChapterId,
            }).Select(x => new RankResultViewModel
            {
                Score = x.Score,
                DisplayName = x.DisplayName,
                Email = x.Email
            }));
            return Ok(result.Take(5).ToList());
        }
    }
}
