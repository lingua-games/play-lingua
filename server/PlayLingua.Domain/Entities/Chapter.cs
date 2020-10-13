using System;

namespace PlayLingua.Domain.Entities
{
    public class Chapter
    {
        public Chapter(Guid chapterId, string name, string description)
        {
            ChapterId   = chapterId;
            Name        = name;
            Description = description;
        }

        public Guid ChapterId { get; }
        public string Name { get; }
        public string Description { get; }
    }
}
