using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;

namespace PlayLingua.Domain.Ports
{
    public interface ISelectedLanguagesRepository
    {
        void SetDefaultLanguages(SelectDefaultLanguageModel selectDefaultLanguageModel, int userId);

    }
}
