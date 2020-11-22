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
                        Email = selectedUser.Email,
                        Id = selectedUser.Id
                    }
                };
            }
            else
            {
                return new LoginResult
                {
                    IsLogin = false,
                    Message = "Wrong email or password"
                };
            }
        }

        public string GenerateToken(User user)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret));
            //var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            //var claims = new List<Claim>
            //{
            //    new Claim(ClaimTypes.Email, user.Email),
            //    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                
            //    new Claim(ClaimTypes.Role, "Simple user")
            //};

            //var tokenOptions = new JwtSecurityToken(
            //    issuer: "Lingua.security.com",
            //    audience: "Lingua.security.com",
            //    claims: claims,
            //    
            //    expires: DateTime.Now.AddDays(7),
            //    signingCredentials: signingCredentials
            //    );

            //return new JwtSecurityTokenHandler().WriteToken(tokenOptions);


            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email.ToString()),
                        // Todo: Work on the roles
                        new Claim(ClaimTypes.Role, ""),
                    }
                ),
                // TODO: Expiration of token should test in both front-end and backend
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = "Lingua.security.com",
                Audience = "Lingua.security.com",
                SigningCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
