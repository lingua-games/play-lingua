using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using System.Collections.Generic;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GamesController : BaseController
    {
        private readonly IGameRepository _gameRepository;
        // private readonly IChapterRepository _chapterRepository;

        public GamesController(IGameRepository gameRepository)
        {
            _gameRepository = gameRepository;
        }

        [HttpPost("get-words-for-game")]
        public ActionResult<List<GetWordsForGameResponseViewModel>> GetWordsForGame([FromBody] GetWordsForGameInputViewModel model)
        {
            return Ok(_gameRepository.GetWordsForGame(new GetWordsForGameInputModel
            {
                BookId = model.BookId,
                ChapterId = model.ChapterId,
                Count = model.Count,
                DefaultBaseLanguage = model.DefaultBaseLanguage,
                DefaultTargetLanguage = model.DefaultTargetLanguage
            }));
        }

        [HttpPost("get-words-count-for-game")]
        public ActionResult<int> GetWordsCountForGame([FromBody] GetWordsForGameInputViewModel model)
        {
            return Ok(_gameRepository.GetWordsCountForGame(new GetWordsForGameInputModel
            {
                BookId = model.BookId,
                ChapterId = model.ChapterId,
                Count = model.Count,
                DefaultBaseLanguage = model.DefaultBaseLanguage,
                DefaultTargetLanguage = model.DefaultTargetLanguage
            }));
        }
    }
}
