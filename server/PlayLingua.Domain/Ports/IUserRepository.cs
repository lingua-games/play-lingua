using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;

namespace PlayLingua.Domain.Ports
{
    public interface IUserRepository
    {
        List<User> List();
        User Add(User user);
        void Delete(string id);
        void Update(EditUserModel user);
    }
}
