using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.Ports
{
    public interface IUserRepository
    {
        List<User> List();
        User Add(User user);
        void Delete(string id);
        void Update(User user);
    }
}
