using System;

namespace PlayLingua.Domain.Entities
{
    public class Language
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NativeName { get; set; }
        public string FullName { get; set; }
    }
}