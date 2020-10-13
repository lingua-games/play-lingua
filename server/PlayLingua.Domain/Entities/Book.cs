using System;

namespace PlayLingua.Domain.Entities
{
    public class Book
    {
        public Book(Guid bookId, string name)
        {
            BookId = bookId;
            Name   = name;
        }

        public Guid BookId { get; }
        public string Name { get; }
    }
}
