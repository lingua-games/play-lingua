using System;

namespace PlayLingua.Domain.Entities
{
    public class Word
    {

        public Guid WordId { get; set; }
        public LangCodeEnum BaseLanguage { get; set; }
        public string BaseWord { get; set; }
        public LangCodeEnum TargetLanguage { get; set; }
        public string Translate { get; set; }
    }
}