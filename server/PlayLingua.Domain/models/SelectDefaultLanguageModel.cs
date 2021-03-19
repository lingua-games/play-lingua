using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.Models
{
    public class SelectDefaultLanguageModel: BaseModel
    {
        public int DefaultBaseLanguage { get; set; }
        public int DefaultTargetLanguage { get; set; }
    }
}
