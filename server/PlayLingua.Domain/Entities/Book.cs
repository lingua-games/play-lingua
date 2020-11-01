using System;

namespace PlayLingua.Domain.Entities
{
    public class Book
    {
        public Book(Guid bookId, string name)
        {
            Id = bookId;
            Name   = name;
        }

        public Guid Id { get; }
        public string Name { get; }
    }
}
