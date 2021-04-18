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
                UniqueKey
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
                @UniqueKey
);" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var id = db.Query<int>(invitationSql, invitation).Single();
            invitation.Id = id;

            var userSql = "SELECT * from[PlayLingua].[dbo].[Users] where Email = @Email";
            if (!db.Query<int>(userSql, invitation).Any())
            {
                var addUserSql =
                     @"insert into dbo.Users 
                        (
                            Email, 
                            AddedDate, 
                            NeedsResetPassword,
                            Password,
                            IsEmailVerified
                        ) VALUES (
                            @Email, 
                            @AddedDate, 
                            1,
                            ' ',
                            1
                        ); 
                        SELECT CAST(SCOPE_IDENTITY() as int)
                    ";
                db.Query<int>(addUserSql, new { invitation.Email, invitation.AddedDate }).Single();
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
                TargetLanguageId = @TargetLanguageId
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
    }
}
