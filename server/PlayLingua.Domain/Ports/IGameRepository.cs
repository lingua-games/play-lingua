using PlayLingua.Domain.Models;
using System.Collections.Generic;

namespace PlayLingua.Domain.Ports
{
    public interface IGameRepository
    {
        List<GetWordsForGameResponseModel> GetWordsForGame(GetWordsForGameInputModel getWordsForGameInputModel);
    }
}
