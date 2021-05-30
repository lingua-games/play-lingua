using System;
using System.ComponentModel.DataAnnotations;

namespace PlayLingua.Contract.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string BaseLanguages { get; set; }
        public string TargetLanguages { get; set; }
        public bool IsSelectedLanguages { get; set; }
        public SelectedLanguagesViewModel SelectedLanguages { get; set; }
        public bool IsChangingPassword { get; set; }
        public float TotalScore { get; set; }
        public string EmailVerificationCode { get; set; }
        public bool IsEmailVerified { get; set; }
        public DateTime EmailVerifiedDate { get; set; }
        public int? DefaultBaseLanguageId { get; set; }
        public int? DefaultTargetLanguageId { get; set; }
        public LanguageViewModel DefaultBaseLanguage { get; set; }
        public LanguageViewModel DefaultTargetLanguage { get; set; }
        public bool NeedsResetPassword { get; set; }
    }
}

