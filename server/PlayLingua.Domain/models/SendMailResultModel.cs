using System;
using System.Collections.Generic;
using System.Text;

namespace PlayLingua.Domain.Models
{
    public class SendMailResultModel
    {
        public bool IsEmailSent { get; set; }
        public string EmailErrorMessage { get; set; }
    }
}
