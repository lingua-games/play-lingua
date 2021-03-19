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

        public List<GetWordsForGameResponseModel> GetWordsForGame(GetWordsForGameInputModel model)
        {
            var result = new List<GetWordsForGameResponseModel>();

            if (model.BookId == 0)
            {
                var words = db.Query<Word>(@"select top " + model.Count + @" * from [dbo].[Word] 
                                            WHERE 
                                            TargetLanguageId = @DefaultTargetLanguage AND
                                            BaseLanguageId = @DefaultBaseLanguage", model).ToList();

                
                foreach (var word in words.GroupBy(x => x.BaseWord))
                {
                    result.Add(new GetWordsForGameResponseModel
                    {
                        Key = word.Key,
                        Values = words.Where(x => x.BaseWord == word.Key).Select(x => x.Translate).ToList()
                    });
                }
                return result;
            } else
            {
                var words = db.Query<Word>(@"select top " + model.Count + @" * from [dbo].[Word] 
                                            WHERE 
                                            TargetLanguageId = @DefaultTargetLanguage AND
                                            BaseLanguageId = @DefaultBaseLanguage" +
                            (model.BookId != 0 ? " AND BookId = " + model.BookId : "") +
                            (model.ChapterId != 0 ? " AND ChapterId = " + model.ChapterId : ""), model).ToList();


                foreach (var word in words.GroupBy(x => x.BaseWord))
                {
                    result.Add(new GetWordsForGameResponseModel
                    {
                        Key = word.Key,
                        Values = words.Where(x => x.BaseWord == word.Key).Select(x => x.Translate).ToList()
                    });
                }
                return result;
            }
        }
    }
}
