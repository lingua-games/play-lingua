using Dapper;
using PlayLingua.Domain.Entities;
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
            var sql =
                "insert into dbo.Users (Username, Password) VALUES(@Username, @Password);" +
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

        public void Update(User user)
        {
            throw new NotImplementedException();
        }
    }
}
