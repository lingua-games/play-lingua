using System;
using System.ComponentModel.DataAnnotations;

namespace PlayLingua.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(200)]
        public string Password { get; set; }
        public string BaseLanguages { get; set; }
        public string TargetLanguages { get; set; }
        public bool IsSelectedLanguages { get; set; }
    }
}
