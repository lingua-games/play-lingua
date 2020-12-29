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
    public class BookRepository : IBookRepository
    {
        private readonly IDbConnection db;

        public BookRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public Book Add(Book book, int userId)
        {
            book.AddedBy = userId;
            book.AddedDate = DateTime.Now;

            var sql =
                "insert into dbo.Book (Name, TargetLanguageId, SourceLanguageId,AddedBy, AddedDate) VALUES(@Name, @TargetLanguageId,@SourceLanguageId, @AddedBy, @AddedDate);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var id = db.Query<int>(sql, book).Single();
            book.Id = id;
            return book;
        }

        public void Delete(string id)
        {
            db.Query("delete from dbo.Book where Id = @id", new { id });
        }

        public List<Book> List()
        {
            return db.Query<Book>("select * from dbo.Book").ToList();
        }

        public List<Book> GetByLanguage(int languageId)
        {
            return db.Query<Book>("select * from dbo.Book where TargetLanguageId = @languageId", new { languageId }).ToList();
        }

        public void Update(Book book)
        {
            book.LastUpdateDate = DateTime.Now;
            db.Query("update dbo.Book SET Name = @Name WHERE Id = @Id", book);
        }

        public List<Book> GetBySourceAndTargetLanguageId(int sourceLanguageId, int targetLanguageId)
        {
            return db.Query<Book>(@"
                            select * from dbo.Book 
                                where 
                            TargetLanguageId = @targetLanguageId AND 
                            SourceLanguageId = @sourceLanguageId
                                ", new { targetLanguageId, sourceLanguageId }).ToList();
        }
    }
}
