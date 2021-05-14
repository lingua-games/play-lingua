using Dapper;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.WebSockets;

namespace PlayLingua.Data
{
    public class GameRepository : IGameRepository
    {
        private readonly IDbConnection db;

        public GameRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public int GetWordsCountForGame(GetWordsForGameInputModel model)
        {
            var sql = @"
                        select Distinct BaseWord from [dbo].[Word] 
                        WHERE 
                            TargetLanguageId = @DefaultTargetLanguage AND
                            BaseLanguageId = @DefaultBaseLanguage 
                            
                        ";
            if (model.BookId != 0)
            {
                sql += "AND BookId = @BookId ";
                if (model.ChapterId != 0)
                {
                    sql += "AND ChapterId = @ChapterId";
                }
            }
            return db.Query<string>(sql, model).Count();
        }

        public List<GetWordsForGameResponseModel> GetWordsForGame(GetWordsForGameInputModel model)
        {
            var result = new List<GetWordsForGameResponseModel>();
            //var sql = @"select top " + model.Count + @" * from [dbo].[Word] 
            //                                WHERE 
            //                                TargetLanguageId = @DefaultTargetLanguage AND
            //                                BaseLanguageId = @DefaultBaseLanguage ";
            //if (model.BookId != 0)
            //{
            //    sql += "AND BookId = @BookId ";
            //    if (model.ChapterId != 0)
            //    {
            //        sql += "AND ChapterId = @ChapterId";
            //    }
            //}
            //var words = db.Query<Word>(sql, model).ToList();

            //foreach (var word in words.GroupBy(x => x.BaseWord))
            //{
            //    result.Add(new GetWordsForGameResponseModel
            //    {
            //        Key = word.Key,
            //        Values = words.Where(x => x.BaseWord == word.Key).Select(x => x.Translate).ToList()
            //    });
            //}
            return result;
        }
    }
}
