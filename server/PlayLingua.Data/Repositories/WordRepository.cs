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

        public LanguageInformation InquiryAboutSelectedLanguages(Language language)
        {
            var sql =
                @"SELECT Language.Code as Code, Language.Name as Name from [dbo].Language as Language  
                left join[dbo].Word as Word on Language.id = word.id
                where word.id = @Id";

            var result = db.Query<LanguageInformation>(sql, language).SingleOrDefault();
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
