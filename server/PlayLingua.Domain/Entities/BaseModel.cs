using System;

namespace PlayLingua.Domain.Entities
{
    public class BaseModel
    {
        public int? AddedBy { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime LastUpdateDate { get; set; }

    }
}
