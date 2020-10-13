using System;

namespace PlayLingua.Domain.Entities
{
    public class Word
    {
        public Word(Guid wordId, LangCode baseLanguage, string baseWord, LangCode targetLanguage, string translate)
        {
            WordId         = wordId;
            BaseLanguage   = baseLanguage;
            BaseWord       = baseWord;
            TargetLanguage = targetLanguage;
            Translate      = translate;
        }

        public Guid WordId { get; }
        public LangCode BaseLanguage { get; }
        public string BaseWord { get; }
        public LangCode TargetLanguage { get; }
        public string Translate { get; }
    }

    public enum LangCode
    {
        None = 0,
        EN   = 1,
        NL   = 2
    }
}