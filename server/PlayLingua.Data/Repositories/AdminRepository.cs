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
                EmailErrorMessage,
                Title,
                Visible
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
                @EmailErrorMessage,
                @Title,
                1
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

        public List<Invitation> GetVisibleInvitations()
        {
            return db.Query<Invitation>(@"
select 
	Invitations.PlayerName,
	Invitations.Email,
	Invitations.Game,
	Invitations.BaseLanguageId,
	Invitations.TargetLanguageId,
	Invitations.Bookid,
	Invitations.ChapterId,
	Invitations.Count,
	Invitations.GeneratedLink,
	Invitations.IsOpened,
    Invitations.AddedDate,
	Invitations.AddedBy,
	Invitations.OpenedDate,
	Invitations.IsEmailSent,
	Invitations.UniqueKey,
	score.NumberOfPlayed,
	score.Score
from dbo.Invitations 
left join (select max(GameScores.FeedbackUniqueKey) as FeedbackUniqueKey,  max(GameScores.Score) as Score, count(*) as NumberOfPlayed from dbo.GameScores group by GameScores.FeedbackUniqueKey) as score
on Invitations.UniqueKey = score.FeedbackUniqueKey
where visible = 1
order by Invitations.id desc
").ToList();
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
                using var client = new System.Net.Mail.SmtpClient()
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
                    Subject = invitation.Title,
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
            catch (Exception ex)
            {
                return new SendMailResultModel
                {
                    IsEmailSent = false,
                    EmailErrorMessage = JsonConvert.SerializeObject(ex)
                };
            }
        }

        public List<UserListForInvitationModel> GetUserListForInvitation()
        {
            return db.Query<UserListForInvitationModel>(@"SELECT [Email],[DisplayName] FROM [dbo].[Users]").ToList();
        }

        public void ChangeInvitationVisibility(Invitation invitation)
        {
            db.Query(@"update dbo.Invitations SET 
                        Visible = @Visible
                        WHERE UniqueKey = @UniqueKey", invitation);
        }
    }
}
