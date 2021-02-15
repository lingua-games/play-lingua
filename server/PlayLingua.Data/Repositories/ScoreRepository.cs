using Dapper;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.WebSockets;

namespace PlayLingua.Data
{
    public class ScoreRepository : IScoreRepository
    {
        private readonly IDbConnection db;

        public ScoreRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public Score Add(Score score, int userId)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<Score> GetByUserId(int userId)
        {
            throw new NotImplementedException();
        }

        public void Update(Score score)
        {
            throw new NotImplementedException();
        }
    }
}
