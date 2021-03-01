using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;

namespace PlayLingua.Domain.Ports
{
    public interface IScoreRepository
    {
        List<Score> GetByUserId(int userId);
        List<RankResultModel> GetTopRanks(Score score);
        Score Add(Score score, int? userId);
        void Delete(int id);
        void Update(Score score);
        void IncreaseScore(float score, int userId);
    }
}
