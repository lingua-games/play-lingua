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
    public class AdminRepository : IAdminRepository
    {
        private readonly IDbConnection db;

        public AdminRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public Invitation AddInvitation(Invitation invitation)
        {
            throw new NotImplementedException();
        }

        public List<Invitation> GetInvitations()
        {
            throw new NotImplementedException();
        }
    }
}
