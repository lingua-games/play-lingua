using System;
using System.Collections.Generic;
using System.Text;

namespace PlayLingua.Domain.models
{
    public class GetWordsForGameInputModel
    {
        public int BookId { get; set; }
        public int ChapterId { get; set; }
        public int Count { get; set; }
        public int DefaultTargetLanguage { get; set; }
        public int DefaultBaseLanguage { get; set; }
    }
}
