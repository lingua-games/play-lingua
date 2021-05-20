using Dapper;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using MimeKit;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace PlayLingua.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnection db;
        public string _hashKey;
        public readonly EmailModel _email;
        public UserRepository(string connectionString, string hashKey, EmailModel email)
        {
            db = new SqlConnection(connectionString);
            _hashKey = hashKey;
            _email = email;
        }

        public User Add(User user)
        {
            user.EmailVerificationCode = Guid.NewGuid().ToString();
            SendVerificationCode(user);
            user.Password = CreateHashPassword(user.Password, _hashKey);
            user.AddedDate = DateTime.Now;
            var sql =
                "insert into dbo.Users (Email, Password, AddedDate, DisplayName, EmailVerificationCode) VALUES(@Email, @Password, @AddedDate, @DisplayName, @EmailVerificationCode);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var id = db.Query<int>(sql, user).Single();
            user.Id = id;
            return user;
        }

        public static string CreateHashPassword(string value, string salt)
        {
            var valueBytes = KeyDerivation.Pbkdf2(
                                password: value,
                                salt: Encoding.UTF8.GetBytes(salt),
                                prf: KeyDerivationPrf.HMACSHA512,
                                iterationCount: 10000,
                                numBytesRequested: 256 / 8);

            return Convert.ToBase64String(valueBytes);
        }

        public void SendVerificationCode(User user)
        {
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }
        }


        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public UserModel GetUserInformation(int userId)
        {
            var result = new UserModel();
            var user = db.Query<User>("select top 1 * from dbo.Users where id = @userId", new { userId }).Select(x => new UserModel
            {
                TotalScore = x.TotalScore,
                DefaultBaseLanguageId = x.DefaultBaseLanguageId,
                DefaultTargetLanguageId = x.DefaultTargetLanguageId,
                Id = x.Id
            }).FirstOrDefault();

            result.TotalScore = user.TotalScore;
            result.DefaultBaseLanguage = db.Query<LanguageModel>("select top 1 * from dbo.Language where id = @DefaultBaseLanguageId", user).FirstOrDefault();
            result.DefaultTargetLanguage = db.Query<LanguageModel>("select top 1 * from dbo.Language where id = @DefaultTargetLanguageId", user).FirstOrDefault();
            result.SelectedLanguages = db.Query<SelectedLanguageModel>("select top 1 * from dbo.SelectedLanguages where userId = @Id", user).FirstOrDefault();

            return result;
        }

        public User GetUserInformationByEmail(string email)
        {
            return db.Query<User>("select top 1 * from dbo.Users where Email = @email", new { email }).FirstOrDefault();
        }

        public List<User> List()
        {
            return db.Query<User>("select * from dbo.Users").ToList();
        }

        public void Update(EditUserModel user)
        {
            user.NewPassword = user.IsChangingPassword ? CreateHashPassword(user.NewPassword, _hashKey) : "";
            user.LastUpdateDate = DateTime.Now;
            var sql = @"
update dbo.Users SET DisplayName = @DisplayName " +
(user.IsChangingPassword ? @", Password = @newPassword " : "") +
@" WHERE Id = @Id";
            db.Query(sql, user);
        }
    }
}
