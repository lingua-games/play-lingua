using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.Ports
{
    public interface ISelectedLanguagesRepository
    {
        List<SelectedLanguages> List();
        SelectedLanguages GetByUserId(int userId);
        SelectedLanguages Add(SelectedLanguages selectedLanguages);
        void Delete(string id);
        void Update(SelectedLanguages selectedLanguages);

    }
}
