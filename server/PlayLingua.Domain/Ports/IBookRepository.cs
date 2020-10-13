using System.Collections.Generic;
using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.Ports
{
    public interface IBookRepository
    {
        List<Book> GetBooks();
    }
}
