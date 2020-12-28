using PlayLingua.Domain.Entities;
using System.Collections.Generic;

namespace PlayLingua.Domain.models
{
    public class SubmitWordsModel
    {
        public NameIdModel BaseLanguage { get; set; }
        public Book Book { get; set; }
        public Chapter Chapter { get; set; }
        public NameIdModel TargetLanguage { get; set; }
        public List<FormWords> Words { get; set; }
        public string IsRandom { get; set; }
    }

    public class FormWords
    {
        public FormWord Base { get; set; }
        public List<FormWord> targets { get; set; }
    }

    public class FormWord
    {
        public string Value { get; set; }
        public bool IsValid { get; set; }
    }

}
