using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.models
{
    public class SelectDefaultLanguageModel: BaseModel
    {
        public int DefaultBaseLanguage { get; set; }
        public int DefaultTargetLanguage { get; set; }
    }
}
