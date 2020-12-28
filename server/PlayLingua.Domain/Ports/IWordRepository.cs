using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
using PlayLingua.Domain.Models;
using System.Collections.Generic;

namespace PlayLingua.Domain.Ports
{
    public interface IWordRepository
    {
        List<Word> List(int chapterId, int bookId);
        Word Add(Word book);
        void Delete(string id);
        void Update(Word book);
        bool InquiryAboutSelectedLanguages(SelectedLanguageModel baseLanguage);
        void SubmitWordSeries(SubmitWordsModel submitWords, int userId);
    }
}
