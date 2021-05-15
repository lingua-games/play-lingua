using System;
using System.Collections.Generic;

namespace PlayLingua.Contract.ViewModels
{
    public class GetWordsForGameResponseViewModel
    {
        public string Key { get; set; }
        public List<Translate> Translates { get; set; }
        public Guid WordSpeechCode { get; set; }
        public SpeechStatus WordSpeechStatus { get; set; }
    }
    public class Translate
    {
        public Guid SpeechCode { get; set; }
        public SpeechStatus SpeechStatus { get; set; }
        public string Value { get; set; }
    }

    public enum SpeechStatus
    {
        NotFound = 0,
        Success = 1,
        Error = 2
    }
}
