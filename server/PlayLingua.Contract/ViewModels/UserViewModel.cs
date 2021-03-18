using System;
using System.ComponentModel.DataAnnotations;

namespace PlayLingua.Contract.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Email { get; set; }
        [Required]
        [MaxLength(200)]
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string BaseLanguages { get; set; }
        public string TargetLanguages { get; set; }
        public bool IsSelectedLanguages { get; set; }
        public bool IsChangingPassword { get; set; }
        public float TotalScore { get; set; }
        public string EmailVerificationCode { get; set; }
        public bool IsEmailVerified { get; set; }
        public DateTime EmailVerifiedDate { get; set; }
        public int DefaultBaseLanguage { get; set; }
        public int DefaultTargetLanguage { get; set; }
    }
}

