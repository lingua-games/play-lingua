using Dapper;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace PlayLingua.Data
{
    public class ChapterRepository : IChapterRepository
    {
        private IDbConnection db;

        public ChapterRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public Chapter Add(Chapter chapter, int userId)
        {
            chapter.AddedBy = userId;
            chapter.AddedDate = DateTime.Now;

            var sql =
                "insert into dbo.Chapter (Name, Description, BookId,AddedBy, AddedDate) VALUES(@Name, @Description,@BookId, @AddedBy, @AddedDate);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var id = db.Query<int>(sql, chapter).Single();
            chapter.Id = id;
            return chapter;
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public List<Chapter> GetByBookId(int bookId)
        {
            return db.Query<Chapter>("select * from [dbo].[Chapter] where BookId = @bookId", new { bookId }).ToList();
        }

        public List<Chapter> List()
        {
            throw new NotImplementedException();
        }

        public void Update(Chapter book)
        {
            throw new NotImplementedException();
        }
    }
}
