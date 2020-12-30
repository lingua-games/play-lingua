using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
using System.Collections.Generic;

namespace PlayLingua.Domain.Ports
{
    public interface IGameRepository
    {
        List<GetWordsForGameResponseModel> GetWordsForGame(GetWordsForGameInputModel getWordsForGameInputModel, User user);
    }
}
