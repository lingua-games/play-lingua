using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.Ports
{
    public interface IBookRepository
    {
        List<Book> List();
        Book Add(Book book);
        bool Delete(string id);
        Book Update(Guid id, Book book);
    }
}
