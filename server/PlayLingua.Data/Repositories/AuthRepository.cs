using Dapper;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.IdentityModel.Tokens;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
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
            var foundUser = new UserModel();
            var result = new LoginResult();
            user.Password = CreateHashPassword(user.Password, _hashKey);
            string query = @"
                            SELECT 
	                            Users.Email,
	                            Users.Id,
	                            Users.DisplayName,
	                            Users.TotalScore,
	                            Users.DefaultBaseLanguageId,
	                            Users.DefaultTargetLanguageId,
                                Users.Password,
                                Users.IsAdmin,
                                Users.NeedsResetPassword
                            FROM [dbo].[Users]
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
                foundUser.Email = selectedUser.Email;
                foundUser.Id = selectedUser.Id;
                foundUser.DisplayName = selectedUser.DisplayName;
                foundUser.IsAdmin = selectedUser.IsAdmin;
                foundUser.TotalScore = selectedUser.TotalScore;
                foundUser.NeedsResetPassword = selectedUser.NeedsResetPassword;

                foundUser.DefaultBaseLanguage = db.Query<LanguageModel>("select * from Language where id = @DefaultBaseLanguageId", selectedUser).FirstOrDefault();
                foundUser.DefaultTargetLanguage = db.Query<LanguageModel>("select * from Language where id = @DefaultTargetLanguageId", selectedUser).FirstOrDefault();

                return new LoginResult
                {
                    IsLogin = true,
                    User = foundUser
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

        public string GenerateToken(UserModel user)
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
                        new Claim("displayName", user.DisplayName != null ? user.DisplayName.ToString() : ""),
                        new Claim("isAdmin", user.IsAdmin.ToString().ToLower()),
                        new Claim("needsResetPassword", user.NeedsResetPassword.ToString().ToLower()),
                        // Todo: Work on the roles
                        new Claim(ClaimTypes.Role, ""),
                    }
                ),
                // TODO: Expiration of token should test in both front-end and backend
                Expires = DateTime.UtcNow.AddYears(1),
                Issuer = "Lingua.security.com",
                Audience = "Lingua.security.com",
                SigningCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
