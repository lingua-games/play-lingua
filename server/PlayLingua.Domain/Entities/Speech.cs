using PlayLingua.Domain.Models;
using System;

namespace PlayLingua.Domain.Entities
{
    public class Speech
    {
        public int Id { get; set; }
        public Guid Code { get; set; }
        public DateTime AddedDate { get; set; }
        public SpeechStatus Status { get; set; }
        public string ErrorMessage { get; set; }
    }
}
