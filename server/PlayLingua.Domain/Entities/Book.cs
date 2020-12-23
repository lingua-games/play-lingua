using System;

namespace PlayLingua.Domain.Entities
{
    public class Book: BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TargetLanguageId { get; set; }
    }
}
