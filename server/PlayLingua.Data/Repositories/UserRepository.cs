using Dapper;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.WebSockets;
using System.Text;

namespace PlayLingua.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnection db;
        public string _hashKey;
        public UserRepository(string connectionString, string hashKey)
        {
            db = new SqlConnection(connectionString);
            _hashKey = hashKey;
        }

        public User Add(User user)
        {
            user.Password = CreateHashPassword(user.Password, _hashKey);
            user.AddedDate = DateTime.Now;
            var sql =
                "insert into dbo.Users (Email, Password, AddedDate, DisplayName) VALUES(@Email, @Password, @AddedDate, @DisplayName);" +
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



        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public User GetUserInformation(int userId)
        {
            return db.Query<User>("select top 1 * from dbo.Users").Select(x => new User
            {
                TotalScore = x.TotalScore,
            }).FirstOrDefault();
        }

        public List<User> List()
        {
            return db.Query<User>("select * from dbo.Users").ToList();
        }

        public void Update(EditUserModel user)
        {
            user.newPassword = user.IsChangingPassword ? CreateHashPassword(user.newPassword, _hashKey) : "";
            user.LastUpdateDate = DateTime.Now;
            var sql = @"
update dbo.Users SET DisplayName = @DisplayName " +
(user.IsChangingPassword ? @", Password = @newPassword " : "") +
@" WHERE Id = @Id";
            db.Query(sql, user);
        }
    }
}
