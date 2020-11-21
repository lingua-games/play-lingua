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
    public class SelectedLanguageRepository : ISelectedLanguagesRepository
    {
        private readonly IDbConnection db;

        public SelectedLanguageRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public SelectedLanguages Add(SelectedLanguages book)
        {
            throw new NotImplementedException();
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public List<SelectedLanguages> List()
        {
            throw new NotImplementedException();
        }

        public void Update(SelectedLanguages book)
        {
            throw new NotImplementedException();
        }
    }
}
