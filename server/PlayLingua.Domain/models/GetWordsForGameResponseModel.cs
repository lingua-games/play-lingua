using System;
using System.Collections.Generic;

namespace PlayLingua.Domain.Models
{
    public class GetWordsForGameResponseModel
    {
        public string Key { get; set; }
        public List<Translate> Translates { get; set; }
        public Guid SpeechCode { get; set; }
        public SpeechStatus SpeechStatus { get; set; }

    }

    public class Translate
    {
        public Guid SpeechCode { get; set; }
        public SpeechStatus SpeechStatus { get; set; }
        public string Value { get; set; } 
    }
}
