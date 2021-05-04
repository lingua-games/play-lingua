using Dapper;
using MailKit.Net.Smtp;
using MimeKit;
using Newtonsoft.Json;
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

namespace PlayLingua.Data
{
    public class AdminRepository : IAdminRepository
    {
        private readonly IDbConnection db;
        public readonly EmailModel _email;
        public AdminRepository(string connectionString, EmailModel email)
        {
            db = new SqlConnection(connectionString);
            _email = email;
        }

        public Invitation AddInvitation(Invitation invitation)
        {
            var emailResult = SendFeedbackMail(invitation);

            invitation.IsEmailSent = emailResult.IsEmailSent;
            invitation.EmailErrorMessage = emailResult.EmailErrorMessage;

            var invitationSql =
                @"insert into dbo.Invitations 
(
                AddedBy,
                AddedDate,
                BaseLanguageId,
                BookId,
                ChapterId,
                Count,
                Email,
                Game,
                GeneratedLink,
                HtmlText,
                IsOpened,
                OpenedDate,
                PlayerName,
                LastUpdateDate,
                TargetLanguageId,
                UniqueKey,
                IsEmailSent,
                EmailErrorMessage
) VALUES (
                @AddedBy,
                @AddedDate,
                @BaseLanguageId,
                @BookId,
                @ChapterId,
                @Count,
                @Email,
                @Game,
                @GeneratedLink,
                @HtmlText,
                @IsOpened,
                @OpenedDate,
                @PlayerName,
                @LastUpdateDate,
                @TargetLanguageId,
                @UniqueKey,
                @IsEmailSent,
                @EmailErrorMessage
);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var id = db.Query<int>(invitationSql, invitation).Single();
            invitation.Id = id;

            var userSql = "SELECT * from [dbo].[Users] where Email = @Email";
            if (!db.Query<int>(userSql, invitation).Any())
            {
                var addUserSql =
                     @"insert into dbo.Users 
                        (
                            Email, 
                            AddedDate, 
                            NeedsResetPassword,
                            Password,
                            IsEmailVerified,
                            DisplayName
                        ) VALUES (
                            @Email, 
                            @AddedDate, 
                            1,
                            ' ',
                            1,
                            @PlayerName
                        ); 
                        SELECT CAST(SCOPE_IDENTITY() as int)
                    ";
                db.Query<int>(addUserSql, new { invitation.Email, invitation.AddedDate, invitation.PlayerName }).Single();
            }
            return invitation;
        }

        public List<Invitation> GetInvitations()
        {
            return db.Query<Invitation>("select * from dbo.Invitations").ToList();
        }

        public void UpdateInvitation(Invitation invitation)
        {
            invitation.LastUpdateDate = DateTime.Now;
            db.Query(@"update dbo.Invitations SET 
                        BaseLanguageId = @BaseLanguageId,
                        BookId = @BookId,
                        ChapterId = @ChapterId,
                        Count = @Count,
                        Email= @Email,
                        Game = @Game,
                        GeneratedLink = @GeneratedLink,
                        HtmlText = @HtmlText,
                        IsOpened = @IsOpened,
                        OpenedDate = @OpenedDate,
                        PlayerName = @PlayerName,
                        LastUpdateDate = @LastUpdateDate,
                        TargetLanguageId = @TargetLanguageId,
                        IsEmailSent = @IsEmailSent,
                        EmailErrorMessage = @EmailErrorMessage
                        WHERE Id = @Id", invitation);
        }

        public void SetInvitationToOpen(Invitation invitation)
        {
            invitation.IsOpened = true;
            invitation.OpenedDate = DateTime.Now;
            invitation.LastUpdateDate = DateTime.Now;
            db.Query(@"update dbo.Invitations SET 
                IsOpened = @IsOpened,
                OpenedDate = @OpenedDate
WHERE UniqueKey = @UniqueKey", invitation);
        }

        public Invitation GetInvitationByUniqueKey(string UniqueKey)
        {
            return db.Query<Invitation>("select * from dbo.Invitations where UniqueKey = @UniqueKey", new { UniqueKey }).FirstOrDefault();
        }

        public SendMailResultModel SendFeedbackMail(Invitation invitation)
        {
            try
            {
                using (var client = new System.Net.Mail.SmtpClient() {
                    Host = "smtp.office365.com",
                    Port = 587,
                    UseDefaultCredentials = false, 
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential(_email.Username, _email.Password), // you must give a full email address for authentication 
                    TargetName = "STARTTLS/smtp.office365.com", // Set to avoid MustIssueStartTlsFirst exception
                    EnableSsl = true // Set to avoid secure connection exception
                })
                {
                    MailMessage message = new MailMessage()
                    {
                        From = new MailAddress(_email.Username), // sender must be a full email address
                        Subject = "You are invited to Play Lingua!",
                        IsBodyHtml = true,
                        Body = invitation.HtmlText,
                        BodyEncoding = System.Text.Encoding.UTF8,
                        SubjectEncoding = System.Text.Encoding.UTF8,
                        

                    };

                    message.To.Add(invitation.Email);
                    client.Send(message);
                    return new SendMailResultModel
                    {
                        IsEmailSent = true
                    };
                }
            }
            catch (Exception ex)
            {
                return new SendMailResultModel
                {
                    IsEmailSent = false,
                    EmailErrorMessage = JsonConvert.SerializeObject(ex)
                };
            }
        }
    }
}
