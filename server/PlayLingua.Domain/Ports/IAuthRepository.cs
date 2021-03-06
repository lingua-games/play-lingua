﻿using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;

namespace PlayLingua.Domain.Ports
{
    public interface IAuthRepository
    {
        LoginResult Login(User user);
        string GenerateToken(UserModel userId);
    }
}
