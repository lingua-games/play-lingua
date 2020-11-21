using System;
using System.Collections.Generic;
using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.Ports
{
    public interface ISelectedLanguagesRepository
    {
        List<SelectedLanguages> List();
        SelectedLanguages Add(SelectedLanguages book);
        void Delete(string id);
        void Update(SelectedLanguages book);
    }
}
