using PlayLingua.Domain.Entities;
using System;

namespace PlayLingua.WebApi.Dto
{
    public class ChapterDto
    {
        public int ChapterId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public static ChapterDto Map(Chapter entity)
        {
            return new ChapterDto
            {
                ChapterId   = entity.ChapterId,
                Name        = entity.Name,
                Description = entity.Description
            };
        }
    }
}
