﻿using System.ComponentModel.DataAnnotations;

namespace PlayLingua.Domain.Entities
{
    public class SelectedLanguages: BaseModel
    {
        public int Id { get; set; }
        [Required]
        public string BaseLanguages { get; set; }
        [Required]
        public string TargetLanguages { get; set; }
        public int UserId { get; set; }

    }
}
