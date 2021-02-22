using Dapper;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
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

        public string _secret;
        public string _hashKey;

        public AuthRepository(string connectionString, string secret, string hashKey)
        {
            db = new SqlConnection(connectionString);
            _secret = secret;
            _hashKey = hashKey;
        }

        public LoginResult Login(User user)
        {
            var result = new LoginResult();
            user.Password = CreateHashPassword(user.Password, _hashKey);
            string query = @"
                              SELECT * FROM [dbo].[Users] 
                              left join [dbo].[SelectedLanguages]
                              on [Users].Id = [SelectedLanguages].UserId
                              where Email = @Email
                            ";
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
                        Id = selectedUser.Id,
                        DisplayName = selectedUser.DisplayName,
                        BaseLanguages = selectedUser.BaseLanguages,
                        TargetLanguages = selectedUser.TargetLanguages,
                        DefaultBaseLanguage = selectedUser.DefaultBaseLanguage,
                        DefaultTargetLanguage = selectedUser.DefaultTargetLanguage,
                        TotalScore = selectedUser.TotalScore,
                        IsSelectedLanguages =
                            (!string.IsNullOrWhiteSpace(selectedUser.TargetLanguages) && !string.IsNullOrWhiteSpace(selectedUser.BaseLanguages)) ? true : false

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

        public string GenerateToken(User user)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email.ToString()),
                        new Claim("displayName", user.DisplayName.ToString()),
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
