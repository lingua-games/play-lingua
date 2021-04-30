using System;
using System.Collections.Generic;
using System.Text;

namespace PlayLingua.Contract.ViewModels
{
    public class WordOverviewViewModel
    {
        public int BookId { get; set; }
        public int ChapterId { get; set; }
        public int BaseLanguageId { get; set; }
        public int TargetLanguageId { get; set; }
        public string TargetLanguageName { get; set; }
        public string BaseLanguageName { get; set; }
        public int Count { get; set; }
        public string BookName { get; set; }
        public string ChapterName { get; set; }
        public string LastUpdateDate { get; set; }
        public string AddedDate { get; set; }
    }
}
