﻿using System;

namespace PlayLingua.Domain.Entities
{
    public class Invitation : BaseModel
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public int TargetLanguageId { get; set; }
        public int BaseLanguageId { get; set; }
        public long? BookId { get; set; }
        public long? ChapterId { get; set; }
        public string GeneratedLink { get; set; }
        public int Count { get; set; }
        public string PlayerName { get; set; }
        public string Game { get; set; }
        public Guid UniqueKey { get; set; }
        public string HtmlText { get; set; }
        public bool IsOpened { get; set; }
        public DateTime? OpenedDate { get; set; }
        public string Title { get; set; }
        public bool IsEmailSent { get; set; }
        public string EmailErrorMessage { get; set; }
        public bool Visible { get; set; }
        public int NumberOfPlayed { get; set; }
        public float Score { get; set; }
    }
}
