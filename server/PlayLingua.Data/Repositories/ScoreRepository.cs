﻿using Dapper;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
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
            score.AddedBy = userId;
            score.AddedDate = DateTime.Now;
            score.BookId = score.BookId == 0 ? null : score.BookId;
            score.ChapterId = score.ChapterId == 0 ? null : score.ChapterId;

            var sql =
                @"
insert into dbo.[GameScores] 
(UserId, GuestCode, GameName, BookId, ChapterId, AddedDate, Score) 
VALUES(@UserId, @GuestCode, @GameName, @BookId, @ChapterId, @AddedDate, @Score);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var id = db.Query<int>(sql, score).Single();
            score.Id = id;
            return score;
        }

        public void IncreaseScore(float score, int userId)
        {
            var user = db.Query<UserModel>("select * from dbo.Users where Id = @userId", new { userId }).FirstOrDefault();
            score = score + user.TotalScore;
            db.Query("update dbo.Users SET TotalScore = @score WHERE Id = @Id", new { score, user.Id});
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<Score> GetByUserId(int userId)
        {
            throw new NotImplementedException();
        }

        public List<RankResultModel> GetTopRanks(Score score)
        {
            var sql = @"
SELECT top " + score.Count + @" Email as Email,  max(score) as Score, max(DisplayName) as DisplayName FROM [dbo].[GameScores]
left join [dbo].[Users]
on [GameScores].UserId = [Users].Id
where GameName = @GameName AND " + 
(score.BookId != null ? "Bookid = @BookId" : "Bookid is null ")
+ @" AND " +
(score.ChapterId != null ? "ChapterId = @ChapterId" : "ChapterId is null ")
+ @" group by GameScores.UserId, users.Email, users.DisplayName
";
            var result = db.Query<RankResultModel>(sql, score).ToList();
            return result;
        }

        public void Update(Score score)
        {
            throw new NotImplementedException();
        }
    }
}
