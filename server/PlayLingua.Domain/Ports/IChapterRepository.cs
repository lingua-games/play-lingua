using PlayLingua.Domain.Entities;
using System;
using System.Collections.Generic;

namespace PlayLingua.Domain.Ports
{
    public interface IChapterRepository
    {
        List<Chapter> List(int bookId);
        Chapter Add(Chapter book);
        void Delete(string id);
        void Update(Chapter book);
    }
}
