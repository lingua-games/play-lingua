﻿using PlayLingua.Domain;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PlayLingua.Data
{
    public class WordRepository : IWordRepository
    {
        private IDbConnection db;
        public WordRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }
        public Word Add(Word book)
        {
            throw new NotImplementedException();
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public List<Word> List(int chapterId, int bookId)
        {
            throw new NotImplementedException();
        }

        public void Update(Word book)
        {
            throw new NotImplementedException();
        }
    }
}