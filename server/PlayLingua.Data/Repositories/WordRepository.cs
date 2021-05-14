using Dapper;
using Google.Cloud.TextToSpeech.V1;
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

        public void EditWordSeries(SubmitWordsModel submitWords, int userId)
        {
            var modelForDelete = new WordOverviewModel
            {
                BookId = submitWords.Book.Id,
                ChapterId = submitWords.Chapter.Id,
                AddedBy = userId,
                BaseLanguageId = submitWords.BaseLanguage.Id,
                TargetLanguageId = submitWords.TargetLanguage.Id
            };

            var sql = @"
                    delete  WordsToWords
                    FROM dbo.WordsToWords
                    left join dbo.words as wordsBase
                    on WordsToWords.BaseWordId = wordsBase.Id
                    left join dbo.words as wordsTarget
                    on WordsToWords.TargetWordId = wordsTarget.Id
                    where 
                        WordsToWords.AddedBy = @AddedBy              and 
                        wordsBase.LanguageId = @BaseLanguageId	     and 
                        WordsToWords.BookId = @BookId      			 and 
                        WordsToWords.ChapterId = @ChapterId 		 and 
                        wordsTarget.LanguageId =  @TargetLanguageId
                    ";
            db.Query(sql, modelForDelete).ToList();
            SubmitWordSeries(submitWords, userId);
        }
        public List<WordForEditModel> GetWordDetails(WordOverviewModel overview)
        {
            var sql = @"
                    select
                        WordsToWords.id,
                        wordsBase.Word as BaseWord,
                        wordsTarget.Word as Translate
                    from WordsToWords

                    left join words as wordsBase
                    on WordsToWords.BaseWordId = wordsBase.id

                    left join words as wordsTarget
                    on WordsToWords.TargetWordId = wordsTarget.id

                    where 
	                    WordsToWords.AddedBy = @AddedBy and 
	                    wordsBase.LanguageId = @BaseLanguageId and 
	                    wordsTarget.LanguageId = @TargetLanguageId and
	                    WordsToWords.ChapterId = @ChapterId and
	                    WordsToWords.BookId = @BookId
                    ";
            var result = db.Query<WordForEditModel>(sql, overview).ToList();
            return result;
        }
        public List<WordOverviewModel> GetWordOverviews(int userId)
        {
            var sql = @"
                select 
	                WordsToWords.BookId, 
	                WordsToWords.ChapterId,
	                wordsBase.LanguageId as BaseLanguageId,
	                wordsTarget.LanguageId as TargetLanguageId,
	                MAX(BaseLanguage.Name) as BaseLanguageName,
	                MAX(TargetLanguage.Name) as TargetLanguageName,
	                COUNT(wordsBase.Word) as Count,
	                MAX(Book.Name) as BookName,
	                MAX(Chapter.Name) as ChapterName,
	                max(WordsToWords.AddedDate) as AddedDate
                from WordsToWords

                left join words wordsBase
                on WordsToWords.BaseWordId = wordsBase.Id

                left join words wordsTarget
                on WordsToWords.TargetWordId = wordsTarget.Id

                left join dbo.Book
                on WordsToWords.BookId = Book.Id

                left join dbo.Chapter
                on WordsToWords.ChapterId = Chapter.Id

                left join dbo.Language as BaseLanguage
                on wordsBase.LanguageId = BaseLanguage.id

                left join dbo.Language as TargetLanguage
                on wordsTarget.LanguageId = TargetLanguage.id

                where WordsToWords.AddedBy = @userId
                group by WordsToWords.BookId, WordsToWords.ChapterId, wordsBase.LanguageId, wordsTarget.LanguageId
                    ";
            var result = db.Query<WordOverviewModel>(sql, new { userId }).ToList();
            return result;
        }
        public bool InquiryAboutSelectedLanguages(SelectedLanguageModel language)
        {
            var sql = @"
                    SELECT * FROM [dbo].[WordsToWords]

                    left join [dbo].[Words] as wordsBase
                    on WordsToWords.BaseWordId = wordsBase.id

                    left join [dbo].[Words] as wordsTarget
                    on WordsToWords.TargetWordId = wordsTarget.id

                    where wordsBase.LanguageId = @Base and wordsTarget.LanguageId = @Target
                        ";

            db.Close();
            var result = db.Query<LanguageInformation>(sql, language).Any();

            return result;
        }
        public void SubmitWordSeries(SubmitWordsModel submitWords, int userId)
        {
            var targetIds = new List<int?>();
            foreach (var word in submitWords.Words)
            {
                targetIds = new List<int?>();
                foreach (var target in word.Targets)
                {
                    int? wordId = db.Query<int>(
                        @"select * from Words where word = '" + target.Value +
                        @"' and LanguageId = " + submitWords.TargetLanguage.Id)
                        .SingleOrDefault();

                    // Add word if it is not exist in table
                    if (wordId == null || wordId == 0)
                    {
                        var wordToAdd = new Words()
                        {
                            LanguageId = submitWords.TargetLanguage.Id,
                            Word = target.Value,
                            AddedBy = userId,
                            AddedDate = DateTime.Now,
                        };

                        var sql = @"
                            insert into [dbo].[words] (LanguageId, Word, AddedBy, AddedDate)  
                            VALUES (@LanguageId, @Word, @AddedBy, @AddedDate);SELECT CAST(SCOPE_IDENTITY() as int)";

                        wordId = db.Query<int>(sql, wordToAdd).SingleOrDefault();
                    }
                    
                    targetIds.Add(wordId);
                }

                int? baseWordId = db.Query<int>(
                                @"select top 1 * from Words where word = '" + word.Base.Value +
                                @"' and LanguageId = " + submitWords.BaseLanguage.Id)
                                .SingleOrDefault();

                // Add word if it is not exist in table
                if (baseWordId == null || baseWordId == 0)
                {
                    var wordToAdd = new Words()
                    {
                        LanguageId = submitWords.BaseLanguage.Id,
                        Word = word.Base.Value,
                        AddedBy = userId,
                        AddedDate = DateTime.Now,
                    };

                    var sql = @"
                            insert into [dbo].[words] (LanguageId, Word, AddedBy, AddedDate)  
                            VALUES (@LanguageId, @Word, @AddedBy, @AddedDate);SELECT CAST(SCOPE_IDENTITY() as int)";

                    baseWordId = db.Query<int>(sql, wordToAdd).SingleOrDefault();
                }

                foreach (var item in targetIds)
                {
                    var modelToAdd = new WordToWord()
                    {
                        TargetWordId = (int)item,
                        BaseWordId = (int)baseWordId,
                        AddedBy = userId,
                        AddedDate = DateTime.Now,
                        ChapterId = submitWords.Chapter.Id,
                        BookId = submitWords.Book.Id
                    };

                    var sql = @"
                            insert into [dbo].[WordsToWords] (BaseWordId, TargetWordId, AddedBy, AddedDate, BookId, ChapterId)  
                            VALUES (@BaseWordId, @TargetWordId, @AddedBy, @AddedDate, @BookId, @ChapterId)";

                    db.Query<int>(sql, modelToAdd).ToList();
                }
            }
        }
    }
}
