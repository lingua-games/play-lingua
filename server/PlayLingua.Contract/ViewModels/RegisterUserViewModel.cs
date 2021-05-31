using System;
using System.Collections.Generic;
using System.Text;

namespace PlayLingua.Contract.ViewModels
{
    public class RegisterUserViewModel
    {
        public RegisterStatus Status { get; set; }
        public string Token { get; set; }
    }

    public enum RegisterStatus
    {
        NotSet = 0,
        EmailSent = 1,
        AlreadyRegistered = 2,
        NeedsChangePassword = 3,
    }
}
