using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.Ports
{
    public interface IScoreRepository
    {
        List<Score> GetByUserId(int userId);
        Score Add(Score score, int userId);
        void Delete(int id);
        void Update(Score score);
    }
}
