using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;

namespace PlayLingua.Adapter.InMemoryDb.Repositories
{
    public class WordRepository : IWordRepository
    {
        //_data : ChapterId - Words
        private readonly Dictionary<Guid, List<Word>> _data = new Dictionary<Guid, List<Word>>();

        public WordRepository()
        {
            var chapter1Words = new List<Word>
            {
                new Word(Guid.NewGuid(), LangCode.EN, "Hi", LangCode.NL, "Hoi"),
                new Word(Guid.NewGuid(), LangCode.EN, "Hello", LangCode.NL, "Hallo"),
                new Word(Guid.NewGuid(), LangCode.EN, "Good morning", LangCode.NL, "Goedemorgen"),
                new Word(Guid.NewGuid(), LangCode.EN, "Good day", LangCode.NL, "Goedendag"),
                new Word(Guid.NewGuid(), LangCode.EN, "Good evening", LangCode.NL, "Goedenavond")
            };

            _data.Add(StaticData.Chapter1, chapter1Words);

            var chapter2Words = new List<Word>
            {
                new Word(Guid.NewGuid(), LangCode.EN, "Book", LangCode.NL, "Boek"),
                new Word(Guid.NewGuid(), LangCode.EN, "Question", LangCode.NL, "Vraag"),
                new Word(Guid.NewGuid(), LangCode.EN, "Answer", LangCode.NL, "Antwoord")
            };

            _data.Add(StaticData.Chapter2, chapter2Words);
        }

        public List<Word> GetWords(Guid chapterId)
        {
            if (!_data.ContainsKey(chapterId))
                return new List<Word>();

            return _data[chapterId];
        }
    }
}
