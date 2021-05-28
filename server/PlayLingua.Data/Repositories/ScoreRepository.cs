using Dapper;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace PlayLingua.Data
{
    public class ScoreRepository : IScoreRepository

    {
        private readonly IDbConnection db;

        public ScoreRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public void Add(UserScore score, int userId)
        {
            score.AddedBy = userId;
            score.AddedDate = DateTime.Now;
            score.BookId = score.BookId == 0 ? null : score.BookId;
            score.ChapterId = score.ChapterId == 0 ? null : score.ChapterId;

            var sql =
                @"
insert into dbo.[GameScores] 
(UserId, GuestCode, GameName, BookId, ChapterId, AddedDate, Score, BaseLanguageId, TargetLanguageId" +
(!string.IsNullOrEmpty(score.FeedbackUniqueKey) ? ", FeedbackUniqueKey" : "")
+ @") 
VALUES(@UserId, @GuestCode, @GameName, @BookId, @ChapterId, @AddedDate, @Score, @BaseLanguageId, @TargetLanguageId" +
(!string.IsNullOrEmpty(score.FeedbackUniqueKey) ? ", @FeedbackUniqueKey" : "")
+ @");";
            db.Query<int>(sql, score);
        }

        public void IncreaseScore(float score, int userId)
        {
            var user = db.Query<User>("select * from dbo.Users where Id = @userId", new { userId }).FirstOrDefault();
            score += user.TotalScore;
            db.Query("update dbo.Users SET TotalScore = @score WHERE Id = @Id", new { score, user.Id });
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<UserScore> GetByUserId(int userId)
        {
            throw new NotImplementedException();
        }

        public List<RankResultModel> GetTopRanks(UserScore score)
        {
            var sql = @"
SELECT top " + score.Count + @" Email as Email,  max(score) as Score, max(DisplayName) as DisplayName FROM [dbo].[GameScores]
left join [dbo].[Users]
on [GameScores].UserId = [Users].Id
where GameName = @GameName AND BaseLanguageId = @BaseLanguageId AND TargetLanguageId = @TargetLanguageId AND " +
((score.BookId == null || score.BookId == 0)  ? "Bookid is null " : "Bookid = @BookId")
+ @" AND " +
((score.ChapterId == null || score.ChapterId == 0) ? "ChapterId is null " : "ChapterId = @ChapterId")
+ @" group by GameScores.UserId, users.Email, users.DisplayName
";
            var result = db.Query<RankResultModel>(sql, score).ToList();
            return result;
        }

        public void Update(UserScore score)
        {
            throw new NotImplementedException();
        }
    }
}
