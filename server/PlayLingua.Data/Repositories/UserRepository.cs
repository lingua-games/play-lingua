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
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnection db;

        public UserRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public User Add(User user)
        {
            user.AddedDate = DateTime.Now;
            var sql =
                "insert into dbo.Users (Email, Password, AddedDate, DisplayName) VALUES(@Email, @Password, @AddedDate, @DisplayName);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var id = db.Query<int>(sql, user).Single();
            user.Id = id;
            return user;
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public List<User> List()
        {
            return db.Query<User>("select * from dbo.Users").ToList();
        }

        public void Update(EditUserModel user)
        {
            user.LastUpdateDate = DateTime.Now;
            var sql = @"
update dbo.Users SET DisplayName = @DisplayName " +
(user.IsChangingPassword ? @", Password = @newPassword " : "") +
@" WHERE Id = @Id";
            db.Query(sql, user);
        }
    }
}
