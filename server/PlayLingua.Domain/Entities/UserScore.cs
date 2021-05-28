using System;

namespace PlayLingua.Domain.Entities
{
    public class UserScore : BaseModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string GuestCode { get; set; }
        public string GameName { get; set; }
        public int? BookId { get; set; }
        public int? ChapterId { get; set; }
        public float Score { get; set; }
        public int Count { get; set; }
        public string FeedbackUniqueKey { get; set; }
        public int BaseLanguageId { get; set; }
        public int TargetLanguageId { get; set; }
    }
}
