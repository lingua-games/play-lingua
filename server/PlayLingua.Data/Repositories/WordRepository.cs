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
                    delete 
                    FROM [dbo].[Word]
                    where 
	                    word.AddedBy = @AddedBy                 and 
	                    word.BaseLanguageId = @BaseLanguageId	and 
	                    word.BookId = @BookId    				and 
	                    word.ChapterId = @ChapterId 			and 
	                    word.TargetLanguageId = @TargetLanguageId
                    ";
            _ = db.Query<Word>(sql, modelForDelete).ToList();
            SubmitWordSeries(submitWords, userId);
        }

        public List<Word> GetWordDetails(WordOverviewModel overview)
        {
            var sql = @"
                    SELECT 
	                    word.id,
	                    word.BaseWord,
	                    word.Translate
                    FROM [dbo].[Word]

                    left join dbo.Book
                    on word.BookId = Book.Id

                    left join dbo.Chapter
                    on word.ChapterId = Chapter.Id

                    left join dbo.Language as BaseLanguage
                    on word.BaseLanguageId = BaseLanguage.id

                    left join dbo.Language as TargetLanguage
                    on word.TargetLanguageId = TargetLanguage.id

                    where 
	                    word.AddedBy = @AddedBy                 and 
	                    word.BaseLanguageId = @BaseLanguageId	and 
	                    word.BookId = @BookId    				and 
	                    word.ChapterId = @ChapterId 			and 
	                    word.TargetLanguageId = @TargetLanguageId
                    ";
            var result = db.Query<Word>(sql, overview).ToList();
            return result;
        }
        public List<WordOverviewModel> GetWordOverviews(int userId)
        {
            var sql = @"
                        SELECT 
                        word.BookId, 
                        word.ChapterId, 
                        word.BaseLanguageId,
                        word.TargetLanguageId,
                        max(BaseLanguage.Name) as BaseLanguageName,
                        max(TargetLanguage.Name) as TargetLanguageName,
                        COUNT(*) as Count, 
                        max(book.Name) as BookName,
                        max(Chapter.Name) as ChapterName,
                        max(Word.LastUpdateDate) as LastUpdateDate,
                        max(Word.AddedDate) as AddedDate
                        FROM [dbo].[Word]

                        left join dbo.Book
                        on word.BookId = Book.Id

                        left join dbo.Chapter
                        on word.ChapterId = Chapter.Id

                        left join dbo.Language as BaseLanguage
                        on word.BaseLanguageId = BaseLanguage.id

                        left join dbo.Language as TargetLanguage
                        on word.TargetLanguageId = TargetLanguage.id

                        where word.AddedBy = @userId
                        group by word.BookId ,word.ChapterId,word.BaseLanguageId, word.TargetLanguageId 
                    ";
            var result = db.Query<WordOverviewModel>(sql, new { userId }).ToList();
            return result;
        }
        public bool InquiryAboutSelectedLanguages(SelectedLanguageModel language)
        {
            var sql =
                @"SELECT * FROM [dbo].[Word] where BaseLanguageId = @Base and TargetLanguageId = @Target";

            db.Close();
            var result = db.Query<LanguageInformation>(sql, language).Any();

            return result;
        }
        public void SubmitWordSeries(SubmitWordsModel submitWords, int userId)
        {
            foreach (var word in submitWords.Words)
            {
                foreach (var target in word.Targets)
                {
                    var wordToAdd = new Word
                    {
                        BaseLanguageId = submitWords.BaseLanguage.Id,
                        BaseWord = word.Base.Value,
                        TargetLanguageId = submitWords.TargetLanguage.Id,
                        Translate = target.Value,
                        BookId = submitWords.Book != null ? (int?)submitWords.Book.Id : null,
                        ChapterId = submitWords.Chapter != null ? (int?)submitWords.Chapter.Id : null,
                        AddedBy = userId,
                        AddedDate = DateTime.Now,
                    };

                    var sql = @"
insert into [dbo].[Word] (
                        BaseLanguageId,
                        BaseWord,
                        TargetLanguageId,
                        Translate,
                        BookId,
                        ChapterId,
                        AddedBy,
                        AddedDate) VALUES (
                        @BaseLanguageId,
                        @BaseWord,
                        @TargetLanguageId,
                        @Translate,
                        @BookId,
                        @ChapterId,
                        @AddedBy,
                        @AddedDate);";

                    db.Query<int>(sql, wordToAdd).SingleOrDefault();
                }
            }
        }
    }
}
