using PlayLingua.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PlayLingua.Domain.models
{
    public class LoginResult
    {
        public bool IsLogin { get; set; }
        public string Message { get; set; }
        public User User { get; set; }
        public string Token { get; set; }

    }
}
