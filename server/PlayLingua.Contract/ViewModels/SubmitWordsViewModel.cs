using System.Collections.Generic;

namespace PlayLingua.Contract.ViewModels
{
    public class SubmitWordsViewModel
    {
        public NameIdViewModel BaseLanguage { get; set; }
        public BookViewModel Book { get; set; }
        public ChapterViewModel Chapter { get; set; }
        public NameIdViewModel TargetLanguage { get; set; }
        public List<FormWordsViewModel> Words { get; set; }
        public string IsRandom { get; set; }
    }

    public class FormWordsViewModel
    {
        public FormWordViewModel Base { get; set; }
        public List<FormWordViewModel> Targets { get; set; }
    }

    public class FormWordViewModel
    {
        public string Value { get; set; }
        public bool IsValid { get; set; }
    }

}
