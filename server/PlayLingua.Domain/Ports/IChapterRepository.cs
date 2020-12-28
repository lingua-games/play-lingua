using PlayLingua.Domain.Entities;
using System;
using System.Collections.Generic;

namespace PlayLingua.Domain.Ports
{
    public interface IChapterRepository
    {
        List<Chapter> GetByBookId(int bookId);
        List<Chapter> List();
        Chapter Add(Chapter book, int userId);
        void Delete(string id);
        void Update(Chapter book);
    }
}
