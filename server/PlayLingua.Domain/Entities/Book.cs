using System;

namespace PlayLingua.Domain.Entities
{
    public class Book: BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TargetLanguageId { get; set; }
        public int BaseLanguageId { get; set; }
    }
}
