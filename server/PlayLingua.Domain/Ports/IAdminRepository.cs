using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.Ports
{
    public interface IAdminRepository
    {
        List<Invitation> GetInvitations();
        Invitation AddInvitation(Invitation invitation);
    }
}
