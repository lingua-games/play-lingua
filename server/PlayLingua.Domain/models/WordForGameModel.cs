using System;
    
namespace PlayLingua.Domain.Models
{
    public class WordForGameModel
    {
        public int Id { get; set; }
        public int BaseLanguageId { get; set; }
        public string BaseWord { get; set; }
        public int TargetLanguageId { get; set; }
        public string Translate { get; set; }
        public int? BookId { get; set; }
        public int? ChapterId { get; set; }
        public Guid BaseWordSpeechCode { get; set; }
        public SpeechStatus BaseWordSpeechStatus { get; set; }
        public Guid TargetWordSpeechCode { get; set; }
        public SpeechStatus TargetWordSpeechStatus { get; set; }


    }
}
