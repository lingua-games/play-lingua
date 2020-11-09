using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PlayLingua.Adapter.InMemoryDb.Repositories
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

        public List<Chapter> List(int bookId)
        {
            throw new NotImplementedException();
        }

        public void Update(Chapter book)
        {
            throw new NotImplementedException();
        }
    }
}
