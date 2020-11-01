using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

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

        public List<Book> List()
        {
            return _data;
        }

        public Book Add(Book book)
        {
            var addedBook = new Book(Guid.NewGuid(), book.Name);
            _data.Add(addedBook);
            return addedBook;
        }

        public bool Delete(string id)
        {
            try
            {
                var itemToDelete = _data.Find(x => x.Id.ToString() == id);
                _data.Remove(itemToDelete);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public Book Update(Guid id,Book book)
        {
            int index = _data.IndexOf(_data.Find(x => x.Id == id));
            var itemToEdit = new Book(id, book.Name);
            _data[index] = itemToEdit;
            return itemToEdit;
        }
    }
}
