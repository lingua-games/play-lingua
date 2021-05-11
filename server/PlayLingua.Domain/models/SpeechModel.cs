using Google.Cloud.TextToSpeech.V1;
using System;
using System.Collections.Generic;
using System.Text;

namespace PlayLingua.Domain.Models
{
    public class SpeechModel
    {
        public int Id { get; set; }
        public DateTime AddedDate { get; set; }
        public Guid Code { get; set; }
        public string Text { get; set; }
        public string LanguageCode { get; set; }
        public SsmlVoiceGender Gender { get; set; }
    }
}
