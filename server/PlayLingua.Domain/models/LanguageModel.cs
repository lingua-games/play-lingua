using System;
using System.Collections.Generic;
using System.Text;

namespace PlayLingua.Domain.Models
{
    public class LanguageModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NativeName { get; set; }
        public string FullName { get; set; }
    }
}
