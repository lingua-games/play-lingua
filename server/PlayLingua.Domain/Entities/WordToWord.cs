using System;

namespace PlayLingua.Domain.Entities
{
    public class WordToWord
    {
        public int Id { get; set; }
        public int BaseWordId { get; set; }
        public int TargetWordId { get; set; }
        public int AddedBy { get; set; }
        public DateTime AddedDate { get; set; }
        public int? BookId { get; set; }
        public int? ChapterId { get; set; }
    }
}
