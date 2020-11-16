using PlayLingua.Domain.Entities;
using System;
using System.Collections.Generic;

namespace PlayLingua.Domain.Ports
{
    public interface ILanguageRepository
    {
        List<Language> List();
        Language Add(Language language);
        void Delete(string id);
        void Update(Language language);
    }
}
