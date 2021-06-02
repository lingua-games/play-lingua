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
    public class SelectedLanguageRepository : ISelectedLanguagesRepository
    {
        private readonly IDbConnection db;

        public SelectedLanguageRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public void SetDefaultLanguages(SelectDefaultLanguageModel selectDefaultLanguageModel, int userId)
        {
            selectDefaultLanguageModel.LastUpdateDate = DateTime.Now;
            db.Query(
                @"
                    UPDATE [dbo].[Users] 
                        SET 
                            [DefaultTargetLanguageId] = @DefaultTargetLanguage ,
                            [DefaultBaseLanguageId] = @DefaultBaseLanguage,
                            [LastUpdateDate] = @LastUpdateDate
                        where id = @UserId", new { 
                    selectDefaultLanguageModel.DefaultTargetLanguage, 
                    selectDefaultLanguageModel.DefaultBaseLanguage,
                    selectDefaultLanguageModel.LastUpdateDate,
                    userId });
        }
    }
}
