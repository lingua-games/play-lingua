using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;

namespace PlayLingua.Domain.Ports
{
    public interface ISelectedLanguagesRepository
    {
        List<SelectedLanguages> List();
        SelectedLanguages GetByUserId(int userId);
        void SetDefaultLanguages(SelectDefaultLanguageModel selectDefaultLanguageModel, int userId);
        SelectedLanguages Add(SelectedLanguages selectedLanguages);
        void Delete(string id);
        void Update(SelectedLanguages selectedLanguages);

    }
}
