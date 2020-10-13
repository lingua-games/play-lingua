using PlayLingua.Domain.Entities;
using System;
using System.Collections.Generic;

namespace PlayLingua.Domain.Ports
{
    public interface IWordRepository
    {
        List<Word> GetWords(Guid chapterId);
    }
}
