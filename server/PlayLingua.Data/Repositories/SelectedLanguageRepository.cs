using Dapper;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.WebSockets;

namespace PlayLingua.Data
{
    public class SelectedLanguageRepository : ISelectedLanguagesRepository
    {
        private readonly IDbConnection db;

        public SelectedLanguageRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public SelectedLanguages Add(SelectedLanguages selectedLanguages)
        {
            var sql =
                "insert into [dbo].[SelectedLanguages] ([BaseLanguages], [TargetLanguages], [UserId]) VALUES(@BaseLanguages, @TargetLanguages, @UserId);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var id = db.Query<int>(sql, selectedLanguages).Single();
            selectedLanguages.Id = id;
            return selectedLanguages;
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public SelectedLanguages GetByUserId(int userId)
        {
            return db.Query<SelectedLanguages>("select * from [dbo].[SelectedLanguages] where UserId = @userId", new { userId }).SingleOrDefault();
        }

        public List<SelectedLanguages> List()
        {
            throw new NotImplementedException();
        }

        public void SetDefaultLanguages(SelectDefaultLanguageModel selectDefaultLanguageModel, int userId)
        {
            db.Query(
                @"
                    UPDATE [DB_A6A40C_playlingua].[dbo].[Users] 
                    SET [DefaultTargetLanguage] = @DefaultTargetLanguage ,[DefaultBaseLanguage] = @DefaultBaseLanguage 
                    where id = @UserId", new { selectDefaultLanguageModel.DefaultTargetLanguage, selectDefaultLanguageModel.DefaultBaseLanguage, userId });
        }

        public void Update(SelectedLanguages selectedLanguages)
        {
            db.Query("update [dbo].[SelectedLanguages] SET [BaseLanguages] = @BaseLanguages,[TargetLanguages] = @TargetLanguages WHERE Id = @Id", selectedLanguages);
        }
    }
}
