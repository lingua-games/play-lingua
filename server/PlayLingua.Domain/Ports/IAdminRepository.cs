using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;

namespace PlayLingua.Domain.Ports
{
    public interface IAdminRepository
    {
        SendMailResultModel SendFeedbackMail(Invitation invitation);
        List<Invitation> GetVisibleInvitations();
        Invitation AddInvitation(Invitation invitation);
        void ChangeInvitationVisibility(Invitation invitation);
        Invitation GetInvitationByUniqueKey(string UniqueKey);
        void UpdateInvitation(Invitation invitation);
        void SetInvitationToOpen(Invitation invitation);
        List<UserListForInvitationModel> GetUserListForInvitation();
    }
}
