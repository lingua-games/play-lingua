using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;

namespace PlayLingua.Domain.Ports
{
    public interface IUserRepository
    {
        List<User> List();
        void Add(User user);
        UserModel GetUserInformation(int userId);
        User GetUserInformationByEmail(string email);
        User GetUserByActivationCode(string emailVerificationCode);
        bool SendVerificationCode(UserModel user);
        void Delete(string id);
        void Update(EditUserModel user);
        void ActivateUser(UserModel user);
        void ResetPassword(UserModel user);
    }
}
