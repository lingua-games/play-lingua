using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.Ports
{
    public interface IBookRepository
    {
        List<Book> List();
        List<Book> GetByLanguage(int languageId, int baseLanguage);
        List<Book> GetBySourceAndTargetLanguageId(int baseLanguageId, int targetLanguageId);
        Book Add(Book book, int userId);
        void Delete(string id);
        void Update(Book book);
    }
}
