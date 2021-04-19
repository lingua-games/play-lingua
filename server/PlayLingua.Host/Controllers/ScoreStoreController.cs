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
        private readonly IUserRepository _userRepository;

        public ScoreStoreController(
            IScoreRepository scoreRepository, 
            IUserRepository userRepository)
        {
            _scoreRepository = scoreRepository;
            _userRepository = userRepository;
        }

        [HttpPost("get-top-scores")]
        public ActionResult<List<RankResultViewModel>> GetTopScores([FromBody] UserScoreViewModel model)
        {
            var result = new List<RankResultViewModel>();

            result.AddRange(_scoreRepository.GetTopRanks(new UserScore
            {
                GameName = model.GameName,
                BookId = model.BookId,
                ChapterId = model.ChapterId,
                Count = model.Count
            }).Select(x => new RankResultViewModel
            {
                Score = x.Score,
                DisplayName = x.DisplayName,
                Email = x.Email
            }));
            return Ok(result.ToList());
        }

        [HttpPost]
        public ActionResult<List<RankResultViewModel>> Add([FromBody] UserScoreViewModel model)
        {
            var result = new List<RankResultViewModel>();
            if (model.IsFeedback)
            {
                model.UserId = _userRepository.GetUserInformationByEmail(model.Email).Id;
            } else
            {
                model.UserId = GetUser().Id;
            }
            

            if (model.UserId != 0)
            {
                _scoreRepository.Add(new UserScore
                {
                    UserId = model.UserId,
                    GuestCode = model.GuestCode,
                    GameName = model.GameName,
                    BookId = model.BookId,
                    ChapterId = model.ChapterId,
                    AddedDate = model.AddedDate,
                    Score = model.Score
                }, model.UserId);

                _scoreRepository.IncreaseScore(model.Score, model.UserId);
            }

            //result.Add(new RankResultViewModel
            //{
            //    Email = model.UserId != 0 ? GetUser().Email : "You",
            //    DisplayName = model.UserId != 0 ? GetUser().DisplayName : "You",
            //    Score = model.Score
            //});

            result.AddRange(_scoreRepository.GetTopRanks(new UserScore
            {
                GameName = model.GameName,
                BookId = model.BookId,
                ChapterId = model.ChapterId,
                Count = model.Count
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
