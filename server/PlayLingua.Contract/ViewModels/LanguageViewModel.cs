using System;
using System.Collections.Generic;
using System.Text;

namespace PlayLingua.Contract.ViewModels
{
    public class LanguageViewModel
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NativeName { get; set; }
        public string FullName { get; set; }
    }
}
