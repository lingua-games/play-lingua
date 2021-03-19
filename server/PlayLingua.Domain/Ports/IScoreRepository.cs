using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;

namespace PlayLingua.Domain.Ports
{
    public interface IScoreRepository
    {
        List<UserScore> GetByUserId(int userId);
        List<RankResultModel> GetTopRanks(UserScore score);
        void Add(UserScore score, int userId);
        void Delete(int id);
        void Update(UserScore score);
        void IncreaseScore(float score, int userId);
    }
}
