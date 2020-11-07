﻿using Dapper;
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
        private IDbConnection db;

        public BookRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public Book Add(Book book)
        {
            var sql =
                "insert into PlayLingua.dbo.Book (Name) VALUES(@Name);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var id = db.Query<int>(sql, book).Single();
            book.Id = id;
            return book;

        }

        public void Delete(string id)
        {
            db.Query("delete from PlayLingua.dbo.Book where Id = @id", new { id });
        }

        public List<Book> List()
        {
            return db.Query<Book>("select * from PlayLingua.dbo.Book").ToList();
        }

        public void Update(Book book)
        {
            db.Query("update PlayLingua.dbo.Book SET Name = @Name WHERE Id = @Id", book);
        }
    }
}