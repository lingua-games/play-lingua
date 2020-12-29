﻿using System;

namespace PlayLingua.Domain.Entities
{
    public class Word: BaseModel
    {
        public int Id { get; set; }
        public int BaseLanguageId { get; set; }
        public string BaseWord { get; set; }
        public int TargetLanguageId { get; set; }
        public string Translate { get; set; }
        public int? BookId { get; set; }
        public int? ChapterId { get; set; }

    }
}