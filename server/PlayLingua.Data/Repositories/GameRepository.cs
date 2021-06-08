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
                    select WordsToWords.BaseWordId from WordsToWords

                    left join Words as WordsBase
                    on WordsToWords.BaseWordId = WordsBase.Id

                    left join Words as WordsTarget
                    on WordsToWords.TargetWordId = WordsTarget.Id

                    where WordsBase.LanguageId = @DefaultBaseLanguage and WordsTarget.LanguageId = @DefaultTargetLanguage
                        ";

            if (model.BookId != 0)
            {
                sql += " AND WordsToWords.BookId = @BookId ";
                if (model.ChapterId != 0)
                {
                    sql += " AND WordsToWords.ChapterId = @ChapterId ";
                }
            }

            sql += " group by WordsToWords.BaseWordId";
            return db.Query<string>(sql, model).Count();
        }

        public List<GetWordsForGameResponseModel> GetWordsForGame(GetWordsForGameInputModel model)
        {
            var result = new List<GetWordsForGameResponseModel>();
            var sql = @"
                    select top " + model.Count + @"
                    wordsBase.Word as BaseWord,
                    BaseSpeech.Code as BaseWordSpeechCode,
                    BaseSpeech.Status as BaseWordSpeechStatus,
                    WordsTarget.Word as Translate,
                    TargetSpeech.Code as TargetWordSpeechCode,
                    TargetSpeech.Status as TargetWordSpeechStatus,
                    WordsToWords.BookId,
                    WordsToWords.ChapterId,
                    WordsBase.LanguageId as DefaultBaseLanguage,
                    WordsTarget.LanguageId as DefaultTargetLanguage
                    from WordsToWords

                    left join Words as WordsBase
                    on WordsToWords.BaseWordId = WordsBase.Id

                    left join Words as WordsTarget
                    on WordsToWords.TargetWordId = WordsTarget.Id

                    left join Speech as BaseSpeech
                    on WordsBase.SpeechId = BaseSpeech.Id

                    left join Speech as TargetSpeech
                    on WordsTarget.SpeechId = TargetSpeech.Id

                    where WordsBase.LanguageId = @DefaultBaseLanguage and WordsTarget.LanguageId = @DefaultTargetLanguage
                    ";

            if (model.BookId != 0)
            {
                sql += "AND BookId = @BookId ";
                if (model.ChapterId != 0)
                {
                    sql += "AND ChapterId = @ChapterId";
                }
            }
            var words = db.Query<WordForGameModel>(sql, model).ToList();

            foreach (var word in words.GroupBy(x => x.BaseWord))
            {
                result.Add(new GetWordsForGameResponseModel
                {
                    Key = word.Key,
                    Translates = words.Where(x => x.BaseWord == word.Key).Select(x => new Translate { 
                    SpeechCode = x.TargetWordSpeechCode,
                    SpeechStatus = x.TargetWordSpeechStatus,
                    Value = x.Translate
                    }).ToList(),
                    SpeechCode = words.Where(x => x.BaseWord == word.Key).FirstOrDefault().BaseWordSpeechCode,
                    SpeechStatus = words.Where(x => x.BaseWord == word.Key).FirstOrDefault().BaseWordSpeechStatus
                });
            }
            return result;
        }
    }
}
