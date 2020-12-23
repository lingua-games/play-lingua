using Dapper;
using PlayLingua.Domain;
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
    public class WordRepository : IWordRepository
    {
        private readonly IDbConnection db;
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

        public bool InquiryAboutSelectedLanguages(SelectedLanguageModel language)
        {
            var sql =
                @"SELECT * FROM [dbo].[Word] where BaseLanguageId = @Base and TargetLanguageId = @Target";

            db.Close();
            var result = db.Query<LanguageInformation>(sql, language).Any();
            
            return result;
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
