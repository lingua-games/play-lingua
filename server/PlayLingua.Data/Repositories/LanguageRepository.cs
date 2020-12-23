using Dapper;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace PlayLingua.Data
{
    public class LanguageRepository : ILanguageRepository
    {
        private IDbConnection db;
        public LanguageRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public Language Add(Language language)
        {
            db.Close();
            var sql =
                "insert into [dbo].[Language] (Name, Code, NativeName) VALUES(@Name, @Code, @NativeName);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var id = db.Query<int>(sql, language).Single();
            language.Id = id;
            return language;

        }

        public void Delete(string id)
        {
            db.Query("delete from [dbo].[Language] where Id = @id", new { id });
        }

        public List<Language> List()
        {
            return db.Query<Language>("select *, (Name + ' - ' + NativeName) as FullName from [dbo].[Language]").ToList();
        }

        public void Update(Language language)
        {
            db.Query("update [dbo].[Language] SET Name = @Name WHERE Id = @Id", language);
        }
    }
}
