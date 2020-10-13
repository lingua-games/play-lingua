using PlayLingua.Domain.Entities;
using System;
using System.Collections.Generic;

namespace PlayLingua.Domain.Ports
{
    public interface IChapterRepository
    {
        List<Chapter> GetChapters(Guid bookId);
    }
}
