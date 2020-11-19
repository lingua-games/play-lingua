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
            throw new NotImplementedException();
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public List<User> List()
        {
            throw new NotImplementedException();
        }

        public void Update(User user)
        {
            throw new NotImplementedException();
        }
    }
}
