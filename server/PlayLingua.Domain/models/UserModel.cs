using PlayLingua.Domain.Entities;
using System;

namespace PlayLingua.Domain.Models
{
    public class UserModel : BaseModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public bool IsSelectedLanguages { get; set; }
        public bool IsChangingPassword { get; set; }
        public float TotalScore { get; set; }
        public string EmailVerificationCode { get; set; }
        public bool IsEmailVerified { get; set; }
        public DateTime EmailVerifiedDate { get; set; }
        public bool IsAdmin { get; set; }
        public bool NeedsResetPassword { get; set; }
        public LanguageModel DefaultBaseLanguage { get; set; }
        public LanguageModel DefaultTargetLanguage { get; set; }
    }
}
