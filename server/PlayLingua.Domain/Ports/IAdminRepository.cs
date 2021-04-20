using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.Ports
{
    public interface IAdminRepository
    {
        void SendFeedbackMail(Invitation invitation);
        List<Invitation> GetInvitations();
        Invitation AddInvitation(Invitation invitation);
        Invitation GetInvitationByUniqueKey(string UniqueKey);
        void UpdateInvitation(Invitation invitation);
        void SetInvitationToOpen(Invitation invitation);
    }
}
