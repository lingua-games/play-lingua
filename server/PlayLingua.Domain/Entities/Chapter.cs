using System;

namespace PlayLingua.Domain.Entities
{
    public class Chapter
    {
        public Chapter(string name, string description)
        {
            Name        = name;
            Description = description;
        }

        public int ChapterId { get; }
        public string Name { get; }
        public string Description { get; }
    }
}
