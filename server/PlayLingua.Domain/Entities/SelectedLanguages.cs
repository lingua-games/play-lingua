﻿using System.ComponentModel.DataAnnotations;

namespace PlayLingua.Domain.Entities
{
    public class SelectedLanguages: BaseModel
    {
        public int Id { get; set; }
        public string BaseLanguages { get; set; }
        public string TargetLanguages { get; set; }
        public int UserId { get; set; }

    }
}
