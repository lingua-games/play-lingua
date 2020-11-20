using Dapper;
using Microsoft.IdentityModel.Tokens;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.WebSockets;
using System.Security.Claims;
using System.Text;

namespace PlayLingua.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IDbConnection db;

        public string Secret { get; }

        public AuthRepository(string connectionString, string secret)
        {
            db = new SqlConnection(connectionString);
            Secret = secret;
        }

        public LoginResult Login(User user)
        {
            var result = new LoginResult();
            string query = @"SELECT * FROM [DB_A6A40C_playlingua].[dbo].[Users] where Email = @Email";
            var usersWithSelectedEmail = db.Query<User>(query, user).ToList();

            if (!usersWithSelectedEmail.Any())
            {
                return new LoginResult { IsLogin = false, Message = "This email is not exist" };
            }

            if (usersWithSelectedEmail.Any(x => x.Password == user.Password))
            {
                var selectedUser = usersWithSelectedEmail.SingleOrDefault(x => x.Password == user.Password);
                return new LoginResult
                {
                    IsLogin = true,
                    User = new User
                    {
                        Email= selectedUser.Email,
                        Id = selectedUser.Id
                    }
                };
            } else
            {
                return new LoginResult
                {
                    IsLogin = false,
                    Message = "Wrong email or password"
                };
            }
        }

        public string GenerateToken(int userId)
        {
            var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Secret));

            var myIssuer = "Lingua.security.com";
            var myAudience = "Lingua.security.com";

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = myIssuer,
                Audience = myAudience,
                SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
