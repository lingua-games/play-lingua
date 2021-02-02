using System;
using System.Collections.Generic;
using System.Text;

namespace PlayLingua.Domain.models
{
    public class GetWordsForGameResponseModel
    {
        public string Key { get; set; }
        public List<string> Values { get; set; }
    }
}
