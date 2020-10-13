using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;

namespace PlayLingua.Adapter.InMemoryDb.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly List<Book> _data = new List<Book>();
        public BookRepository()
        {
            _data.Add(new Book(StaticData.DutchBook, "Learning Dutch"));

            _data.Add(new Book(Guid.NewGuid(), "Sample Book 1"));
            _data.Add(new Book(Guid.NewGuid(), "Sample Book 2"));
        }

        public List<Book> GetBooks()
        {
            return _data;
        }
    }
}
