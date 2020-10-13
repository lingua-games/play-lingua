using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;

namespace PlayLingua.Adapter.InMemoryDb.Repositories
{
    public class ChapterRepository : IChapterRepository
    {
        //_data : BookId - Chapters
        private readonly Dictionary<Guid, List<Chapter>> _data = new Dictionary<Guid, List<Chapter>>();

        public ChapterRepository()
        {
            var chapterList = new List<Chapter> { 
                new Chapter(StaticData.Chapter1, "Chapter 1", "Description for chapter 1 on dutch book"),
                new Chapter(StaticData.Chapter2, "Chapter 2", "Description for chapter 2 on dutch book")
            };

            for (var i = 3; i < 10; i++)
            {
                chapterList.Add(new Chapter(Guid.NewGuid(), $"Chapter {i}", $"Sample chapter {i}"));
            }

            _data.Add(StaticData.DutchBook, chapterList);
        }

        public List<Chapter> GetChapters(Guid bookId)
        {
            if (!_data.ContainsKey(bookId))
                return new List<Chapter>();

            return _data[bookId];
        }
    }
}
