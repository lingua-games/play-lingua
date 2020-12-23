using PlayLingua.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlayLingua.Domain.Models
{
    public class SelectedLanguageModel: BaseModel
    {
        public int Base { get; set; }
        public int Target { get; set; }
    }
}
