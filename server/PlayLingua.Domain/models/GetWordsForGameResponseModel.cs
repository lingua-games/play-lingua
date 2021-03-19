using System.Collections.Generic;

namespace PlayLingua.Domain.Models
{
    public class GetWordsForGameResponseModel
    {
        public string Key { get; set; }
        public List<string> Values { get; set; }
    }
}
