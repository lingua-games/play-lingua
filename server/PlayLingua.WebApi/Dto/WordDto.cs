using System;
using System.ComponentModel;
using Microsoft.OpenApi.Extensions;
using PlayLingua.Domain.Entities;

namespace PlayLingua.WebApi.Dto
{
    public class WordDto
    {
        public Guid WordId { get; set; }
        public string BaseLanguage { get; set; }
        public string BaseWord { get; set; }
        public string TargetLanguage { get; set; }
        public string Translate { get; set; }

        public static WordDto Map(Word entity)
        {
            return new WordDto
            {
                WordId         = entity.WordId,
                BaseLanguage   = entity.BaseLanguage.GetAttributeOfType<DescriptionAttribute>().Description,
                BaseWord       = entity.BaseWord,
                TargetLanguage = entity.TargetLanguage.GetAttributeOfType<DescriptionAttribute>().Description,
                Translate      = entity.Translate
            };
        }

    }
}