using System;

namespace PlayLingua.Domain.Entities
{
    public class Word
    {
        public Word(Guid wordId, LangCodeEnum baseLanguage, string baseWord, LangCodeEnum targetLanguage, string translate)
        {
            WordId         = wordId;
            BaseLanguage   = baseLanguage;
            BaseWord       = baseWord;
            TargetLanguage = targetLanguage;
            Translate      = translate;
        }

        public Guid WordId { get; }
        public LangCodeEnum BaseLanguage { get; }
        public string BaseWord { get; }
        public LangCodeEnum TargetLanguage { get; }
        public string Translate { get; }
    }
}