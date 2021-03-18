using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;

namespace PlayLingua.Domain.Ports
{
    public interface IUserRepository
    {
        List<UserModel> List();
        UserModel Add(UserModel user);
        UserModel GetUserInformation(int userId);
        void Delete(string id);
        void Update(EditUserModel user);
    }
}
