using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlayLingua.Domain.Models
{
    public class SelectedLanguageModel
    {
        public List<int> Base { get; set; }
        public List<int> Target { get; set; }
    }
}
