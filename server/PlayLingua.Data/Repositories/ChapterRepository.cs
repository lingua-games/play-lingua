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

        public Chapter Add(Chapter book)
        {
            throw new NotImplementedException();
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
