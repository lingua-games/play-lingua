using System;

namespace PlayLingua.Domain.Entities
{
    public class Score : BaseModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string GuestCode { get; set; }
        public string GameName { get; set; }
        public int BookId { get; set; }
        public int ChapterId { get; set; }
        public int score { get; set; }
    }
}
