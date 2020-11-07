using PlayLingua.Domain;
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
                new Word(Guid.NewGuid(), LangCodeEnum.EN, "Hi", LangCodeEnum.NL, "Hoi"),
                new Word(Guid.NewGuid(), LangCodeEnum.EN, "Hello", LangCodeEnum.NL, "Hallo"),
                new Word(Guid.NewGuid(), LangCodeEnum.EN, "Good morning", LangCodeEnum.NL, "Goedemorgen"),
                new Word(Guid.NewGuid(), LangCodeEnum.EN, "Good day", LangCodeEnum.NL, "Goedendag"),
                new Word(Guid.NewGuid(), LangCodeEnum.EN, "Good evening", LangCodeEnum.NL, "Goedenavond")
            };

            //_data.Add(StaticData.Chapter1, chapter1Words);

            var chapter2Words = new List<Word>
            {
                new Word(Guid.NewGuid(), LangCodeEnum.EN, "Book", LangCodeEnum.NL, "Boek"),
                new Word(Guid.NewGuid(), LangCodeEnum.EN, "Question", LangCodeEnum.NL, "Vraag"),
                new Word(Guid.NewGuid(), LangCodeEnum.EN, "Answer", LangCodeEnum.NL, "Antwoord")
            };

            //_data.Add(StaticData.Chapter2, chapter2Words);
        }

        public List<Word> GetWords(Guid chapterId)
        {
            if (!_data.ContainsKey(chapterId))
                return new List<Word>();

            return _data[chapterId];
        }
    }
}
