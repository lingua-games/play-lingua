using Dapper;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using MimeKit;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace PlayLingua.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnection db;
        public string _hashKey;
        public readonly EmailModel _email;
        public UserRepository(string connectionString, string hashKey, EmailModel email)
        {
            db = new SqlConnection(connectionString);
            _hashKey = hashKey;
            _email = email;
        }
        public void Add(User user)
        {
            user.EmailVerificationCode = Guid.NewGuid().ToString();
            var sendEmailResult = SendVerificationCode(new UserModel
            {
                EmailVerificationCode = user.EmailVerificationCode,
                Email = user.Email
            });
            if (!sendEmailResult)
            {
                return;
            }
            user.AddedDate = DateTime.Now;
            var sql =
                @"
                    insert into dbo.Users (
                    Email, 
                    AddedDate, 
                    EmailVerificationCode, 
                    IsEmailVerified, 
                    NeedsResetPassword
                    ) 
                    VALUES(
                    @Email,
                    @AddedDate, 
                    @EmailVerificationCode, 
                    0, 
                    0
                    )";
            db.Query<int>(sql, user);
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
        public bool SendVerificationCode(UserModel user)
        {
            var activationUrl = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" ?
                "http://localhost:4000/#/activate-user/" + user.EmailVerificationCode :
                "https://playinglingua.com/#/activate-user/" + user.EmailVerificationCode;
            try
            {
                using var client = new SmtpClient()
                {
                    Host = "smtp.office365.com",
                    Port = 587,
                    UseDefaultCredentials = false,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential(_email.Username, _email.Password), // you must give a full email address for authentication 
                    TargetName = "STARTTLS/smtp.office365.com", // Set to avoid MustIssueStartTlsFirst exception
                    EnableSsl = true // Set to avoid secure connection exception   
                };
                MailMessage message = new MailMessage()
                {
                    From = new MailAddress(_email.Username), // sender must be a full email address
                    Subject = "PlayingLingua - User Activation",
                    IsBodyHtml = true,
                    Body = @"
<div style='
    background-color: #EFEEE9;
    margin: 5vh 30%;
    width: 40%;
    color:#2F4858;
    font-size: .7vw'>

    <div style='margin: 20px; padding-top: 20px;'>
        <p>Dear " + user.Email + @" ,</p>
        <hr>
        <p>
            Welcome to PlayingLingua, Please activate your email via <a href='" + activationUrl + @"'>This Link</a>
        </p>
        <hr>
        <p>
            Best regards,
            <br>
            Arash
            <br>
            +31645241080
            <br>
            <a style = 'text-decoration: underline;' href = 'https://github.com/arashbahreini' > Github </a>,
            <a style = 'text-decoration: underline;' href = 'https://www.linkedin.com/in/arash-bahreini-100296139/' > Linkedin </a>,
            <a style = 'text-decoration: underline;' href = 'https://stackoverflow.com/users/3773888/arash' > Stackoverflow </a>
        </p>
        <br>
    </div>
</div>
",
                    BodyEncoding = System.Text.Encoding.UTF8,
                    SubjectEncoding = System.Text.Encoding.UTF8,
                };

                message.To.Add(user.Email);
                client.Send(message);
                return true;
            }
            catch
            {
                return false;
            }
        }
        public void Delete(string id)
        {
            throw new NotImplementedException();
        }
        public UserModel GetUserInformation(int userId)
        {
            var result = new UserModel();
            var user = db.Query<User>("select top 1 * from dbo.Users where id = @userId", new { userId }).Select(x => new UserModel
            {
                TotalScore = x.TotalScore,
                Id = x.Id
            }).FirstOrDefault();

            user.DefaultBaseLanguage =
                db.Query<LanguageModel>("select * from Language where id = @DefaultBaseLanguageId", user).FirstOrDefault();
            user.DefaultTargetLanguage = 
                db.Query<LanguageModel>("select * from Language where id = @DefaultTargetLanguageId", user).FirstOrDefault();

            result.TotalScore = user.TotalScore;
            result.DefaultBaseLanguage = db.Query<LanguageModel>("select top 1 * from dbo.Language where id = @DefaultBaseLanguageId", user).FirstOrDefault();
            result.DefaultTargetLanguage = db.Query<LanguageModel>("select top 1 * from dbo.Language where id = @DefaultTargetLanguageId", user).FirstOrDefault();

            return result;
        }
        public User GetUserInformationByEmail(string email)
        {
            return db.Query<User>("select top 1 * from dbo.Users where Email = @email", new { email }).FirstOrDefault();
        }
        public List<User> List()
        {
            return db.Query<User>("select * from dbo.Users").ToList();
        }
        public void Update(EditUserModel user)
        {
            user.NewPassword = user.IsChangingPassword ? CreateHashPassword(user.NewPassword, _hashKey) : "";
            user.LastUpdateDate = DateTime.Now;
            var sql = @"
update dbo.Users SET DisplayName = @DisplayName " +
(user.IsChangingPassword ? @", Password = @newPassword " : "") +
@" WHERE Id = @Id";
            db.Query(sql, user);
        }
        public User GetUserByActivationCode(string emailVerificationCode)
        {
            return db.Query<User>("select top 1 * from dbo.Users where EmailVerificationCode = @emailVerificationCode", new { emailVerificationCode }).FirstOrDefault();
        }
        public void ActivateUser(UserModel user)
        {
            user.Password = CreateHashPassword(user.Password, _hashKey);
            user.EmailVerifiedDate = DateTime.Now;
            var sql = @"
update 
    dbo.Users 
SET 
    DisplayName = @DisplayName, 
    Password = @Password, 
    IsEmailVerified = 1, 
    EmailVerifiedDate = @EmailVerifiedDate  
WHERE 
    EmailVerificationCode = @EmailVerificationCode";
            db.Query(sql, user);
        }

        public void ResetPassword(UserModel user)
        {
            user.Password = CreateHashPassword(user.Password, _hashKey);
            user.LastUpdateDate = DateTime.Now;
            var sql = @"
update 
    dbo.Users 
SET     
    Password       = @Password, 
    LastUpdateDate = @LastUpdateDate,
    NeedsResetPassword = 0
WHERE 
    Email = @Email";
            db.Query(sql, user);
        }
    }
}
