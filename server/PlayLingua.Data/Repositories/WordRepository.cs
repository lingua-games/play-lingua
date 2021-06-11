using Dapper;
using Google.Cloud.TextToSpeech.V1;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;

namespace PlayLingua.Data
{
    public class NotFoundLanguageCode
    {
        public string Code { get; set; }
        public string ErrorMessage { get; set; }
    }
    public class WordRepository : IWordRepository
    {
        private readonly IDbConnection db;
        private List<NotFoundLanguageCode> notFoundLanguageCodes = new List<NotFoundLanguageCode>();
        public WordRepository(string connectionString)
        {
            notFoundLanguageCodes = new List<NotFoundLanguageCode>();
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
	                    " + (overview.ChapterId != 0 && overview.ChapterId != null ? "WordsToWords.ChapterId = @ChapterId" : "WordsToWords.ChapterId is null") + @" and
	                    " + (overview.BookId != 0 && overview.BookId != null ? "WordsToWords.BookId = @BookId" : "WordsToWords.BookId is null") + @"
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
            notFoundLanguageCodes = new List<NotFoundLanguageCode>();
            var baseLanguage = db.Query<Language>(
                        @"select top 1 * from language where id = @Id", new { submitWords.BaseLanguage.Id })
                        .SingleOrDefault();
            var targetLanguage = db.Query<Language>(
            @"select top 1 * from language where id = @Id", new { submitWords.TargetLanguage.Id })
            .SingleOrDefault();

            foreach (var word in submitWords.Words)
            {
                List<int?> targetIds = new List<int?>();
                foreach (var target in word.Targets)
                {
                    var foundTargetWord = db.Query<Words>(
                        @"select top 1 * from Words where word = N'" + target.Value +
                        @"' and LanguageId = " + submitWords.TargetLanguage.Id)
                        .SingleOrDefault();

                    // Add word if it is not exist in table
                    if (foundTargetWord == null)
                    {
                        foundTargetWord = new Words();
                        var wordToAdd = new Words()
                        {
                            LanguageId = submitWords.TargetLanguage.Id,
                            Word = target.Value,
                            AddedBy = userId,
                            AddedDate = DateTime.Now,
                        };

                        wordToAdd.SpeechId = GetVoicFromText(new SpeechModel
                        {
                            Text = wordToAdd.Word,
                            Gender = SsmlVoiceGender.Female,
                            LanguageCode = targetLanguage.Code
                        }).Id;
                        var sql = @"
                            insert into [dbo].[words] (LanguageId, Word, AddedBy, AddedDate, SpeechId)  
                            VALUES (@LanguageId, @Word, @AddedBy, @AddedDate, @SpeechId);SELECT CAST(SCOPE_IDENTITY() as int)";

                        foundTargetWord.Id = db.Query<int>(sql, wordToAdd).SingleOrDefault();
                    }
                    else if (foundTargetWord.SpeechId == 0)
                    {
                        var Speech = GetVoicFromText(new SpeechModel
                        {
                            Text = target.Value,
                            Gender = SsmlVoiceGender.Female,
                            LanguageCode = targetLanguage.Code
                        });
                        db.Query("update dbo.Words SET SpeechId = @SpeechId WHERE Id = @Id", new Words()
                        {
                            SpeechId = Speech.Id,
                            Id = foundTargetWord.Id
                        });
                    }
                    else if (foundTargetWord.SpeechId > 0)
                    {
                        var speech = db.Query<Speech>("select top 1 * from speech WHERE Id = @Id", new SpeechModel()
                        {
                            Id = foundTargetWord.SpeechId
                        }).SingleOrDefault();

                        CheckForSpeechInDisk(speech, target.Value, targetLanguage.Code, SsmlVoiceGender.Female);
                    }


                    targetIds.Add(foundTargetWord.Id);
                }

                var qry = @"select top 1 * from Words where word = N'" + word.Base.Value + "' and LanguageId = " + submitWords.BaseLanguage.Id;
                var foundBaseWord = db.Query<Words>(qry)
                                .SingleOrDefault();

                // Add word if it is not exist in table
                if (foundBaseWord == null)
                {
                    foundBaseWord = new Words();
                    var wordToAdd = new Words()
                    {
                        LanguageId = submitWords.BaseLanguage.Id,
                        Word = word.Base.Value,
                        AddedBy = userId,
                        AddedDate = DateTime.Now,
                    };
                    wordToAdd.SpeechId = GetVoicFromText(new SpeechModel
                    {
                        Text = wordToAdd.Word,
                        Gender = SsmlVoiceGender.Female,
                        LanguageCode = baseLanguage.Code
                    }).Id;

                    var sql = @"
                            insert into [dbo].[words] (LanguageId, Word, AddedBy, AddedDate, SpeechId)  
                            VALUES (@LanguageId, @Word, @AddedBy, @AddedDate, @SpeechId);
                            SELECT CAST(SCOPE_IDENTITY() as int)";

                    foundBaseWord.Id = db.Query<int>(sql, wordToAdd).SingleOrDefault();
                }
                else if (foundBaseWord.SpeechId == 0)
                {
                    var Speech = GetVoicFromText(new SpeechModel
                    {
                        Text = word.Base.Value,
                        Gender = SsmlVoiceGender.Female,
                        LanguageCode = baseLanguage.Code
                    });
                    db.Query("update dbo.Words SET SpeechId = @SpeechId WHERE Id = @Id", new Words()
                    {
                        SpeechId = Speech.Id,
                        Id = foundBaseWord.Id
                    });
                }
                else if (foundBaseWord.SpeechId > 0)
                {
                    var speech = db.Query<Speech>("select top 1 * from speech WHERE Id = @Id", new SpeechModel()
                    {
                        Id = foundBaseWord.SpeechId
                    }).SingleOrDefault();

                    CheckForSpeechInDisk(speech, word.Base.Value, baseLanguage.Code, SsmlVoiceGender.Female);
                }

                foreach (var item in targetIds)
                {
                    var modelToAdd = new WordToWord()
                    {
                        TargetWordId = (int)item,
                        BaseWordId = foundBaseWord.Id,
                        AddedBy = userId,
                        AddedDate = DateTime.Now,
                        ChapterId = submitWords.Chapter.Id,
                        BookId = submitWords.Book.Id
                    };

                    if (submitWords.Chapter.Id == 0)
                    {
                        modelToAdd.ChapterId = null;
                    }

                    if (submitWords.Book.Id == 0)
                    {
                        modelToAdd.BookId = null;
                    }


                    var sql = @"
                            insert into [dbo].[WordsToWords] (BaseWordId, TargetWordId, AddedBy, AddedDate, BookId, ChapterId)  
                            VALUES (@BaseWordId, @TargetWordId, @AddedBy, @AddedDate, @BookId, @ChapterId)";

                    db.Query<int>(sql, modelToAdd).ToList();
                }
            }
        }
        public void CheckForSpeechInDisk(Speech speech, string word, string languageCode, SsmlVoiceGender gender)
        {
            if (!File.Exists("wwwroot/assets/speeches/" + speech.Code + ".mp3"))
            {
                var response = new ResultModel<SynthesizeSpeechResponse>();
                if (notFoundLanguageCodes.Any(x => x.Code == languageCode))
                {
                    response = new ResultModel<SynthesizeSpeechResponse>
                    {
                        Success = false,
                        ErrorMessage = notFoundLanguageCodes.Find(x => x.Code == languageCode).ErrorMessage
                    };
                }
                else
                {
                    response = DownloadWord(new SpeechModel { Text = word, LanguageCode = languageCode, Gender = gender });
                }

                if (!response.Success)
                {
                    speech.ErrorMessage = response.ErrorMessage;
                    speech.Status = SpeechStatus.Error;
                    db.Query<int>(@"
                        update [dbo].[speech] SET 
                            Code = @Code, 
                            AddedDate = @AddedDate, 
                            Status = @Status, 
                            ErrorMessage = @ErrorMessage
                        Where Id = @Id
                        ", speech).SingleOrDefault();
                }
                else
                {
                    // Write the response to the output file.
                    using FileStream output = File.Create("wwwroot/assets/speeches/" + speech.Code + ".mp3");
                    response.Data.AudioContent.WriteTo(output);

                    // To change status of speech to success
                    speech.Status = SpeechStatus.Success;
                    db.Query<Speech>("update dbo.Speech SET Status = @Status where Id = @Id", speech).SingleOrDefault();
                }
            }
            else
            {
                // To change status of speech to success
                speech.Status = SpeechStatus.Success;
                db.Query<Speech>("update dbo.Speech SET Status = @Status where Id = @Id", speech).SingleOrDefault();
            }
        }
        public ResultModel<SynthesizeSpeechResponse> DownloadWord(SpeechModel model)
        {
            if (!File.Exists("wwwroot/assets/speeches/"))
            {
                Directory.CreateDirectory("wwwroot/assets/speeches/");
            }
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "./speech-key.json");

            try
            {
                var client = TextToSpeechClient.Create();

                // The input to be synthesized, can be provided as text or SSML.
                var input = new SynthesisInput
                {
                    Text = model.Text
                };

                // Build the voice request.
                var voiceSelection = new VoiceSelectionParams
                {
                    LanguageCode = model.LanguageCode,
                    SsmlGender = model.Gender
                };

                // Specify the type of audio file.
                var audioConfig = new AudioConfig
                {
                    AudioEncoding = AudioEncoding.Mp3
                };
                // Perform the text-to-speech request.
                return new ResultModel<SynthesizeSpeechResponse> { Data = client.SynthesizeSpeech(input, voiceSelection, audioConfig), Success = true };
            }
            catch (Exception ex)
            {
                notFoundLanguageCodes.Add(new NotFoundLanguageCode
                {
                    Code = model.LanguageCode,
                    ErrorMessage = ex.Message
                });
                return new ResultModel<SynthesizeSpeechResponse> { Success = false, ErrorMessage = ex.Message };
            }
        }
        public SpeechModel GetVoicFromText(SpeechModel model)
        {
            model.Code = Guid.NewGuid();
            try
            {
                var response = new ResultModel<SynthesizeSpeechResponse>();
                if (notFoundLanguageCodes.Any(x => x.Code == model.LanguageCode))
                {
                    response = new ResultModel<SynthesizeSpeechResponse>
                    {
                        Success = false,
                        ErrorMessage = notFoundLanguageCodes.Find(x => x.Code == model.LanguageCode).ErrorMessage
                    };
                }
                else
                {
                    response = DownloadWord(model);
                }

                if (response.Success)
                {
                    // Write the response to the output file.
                    using FileStream output = File.Create("wwwroot/assets/speeches/" + model.Code + ".mp3");
                    response.Data.AudioContent.WriteTo(output);
                    model.Status = SpeechStatus.Success;
                }
                else
                {
                    model.ErrorMessage = response.ErrorMessage;
                    model.Status = SpeechStatus.Error;
                }

            }
            catch (Exception ex)
            {
                model.Status = SpeechStatus.Error;
                model.ErrorMessage = ex.Message;
            }

            model.AddedDate = DateTime.Now;
            model.Id = db.Query<int>(@"
                        insert into [dbo].[speech] (Code, AddedDate, Status, ErrorMessage)  
                        VALUES (@Code, @AddedDate, @Status, @ErrorMessage);
                        SELECT CAST(SCOPE_IDENTITY() as int)
                        ", model).SingleOrDefault();

            return model;
        }
    }
}
