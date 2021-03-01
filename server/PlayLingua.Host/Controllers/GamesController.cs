using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
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
        public ActionResult<List<GetWordsForGameResponseModel>> GetWordsForGame([FromBody] GetWordsForGameInputModel getWordsForGameInputModel)
        {
            return Ok(_gameRepository.GetWordsForGame(getWordsForGameInputModel));
        }
    }
}
