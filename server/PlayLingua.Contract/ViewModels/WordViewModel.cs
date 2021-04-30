using System;
using System.Collections.Generic;
using System.Text;

namespace PlayLingua.Contract.ViewModels
{
    public class WordViewModel
    {
        public int Id { get; set; }
        public int BaseLanguageId { get; set; }
        public string BaseWord { get; set; }
        public int TargetLanguageId { get; set; }
        public string Translate { get; set; }
        public int? BookId { get; set; }
        public int? ChapterId { get; set; }

    }
}
