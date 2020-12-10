using System;
using System.Collections.Generic;
using System.Text;

namespace PlayLingua.Domain.models
{
    public class SelectDefaultLanguageModel
    {
        public int DefaultBaseLanguage { get; set; }
        public int DefaultTargetLanguage { get; set; }
    }
}
