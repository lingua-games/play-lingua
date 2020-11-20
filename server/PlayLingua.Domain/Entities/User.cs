using System;
using System.ComponentModel.DataAnnotations;

namespace PlayLingua.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }

        //[Required]
        //[MaxLength(100)]
        public string Username { get; set; }

        //[Required]
        //[MaxLength(200)]
        public string Password { get; set; }
    }
}
