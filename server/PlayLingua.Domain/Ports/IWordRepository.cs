using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
using System.Collections.Generic;

namespace PlayLingua.Domain.Ports
{
    public interface IWordRepository
    {

        bool InquiryAboutSelectedLanguages(SelectedLanguageModel baseLanguage);
        void SubmitWordSeries(SubmitWordsModel submitWords, int userId);
        void EditWordSeries(SubmitWordsModel submitWords, int userId);
        List<WordOverviewModel> GetWordOverviews(int userId);
        List<WordForEditModel> GetWordDetails(WordOverviewModel overview);
    }
}
