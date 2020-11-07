using PlayLingua.Domain.Entities;
using System;

namespace PlayLingua.WebApi.Dto
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static BookDto Map(Book entity)
        {
            return new BookDto
            {
                Id = entity.Id,
                Name   = entity.Name
            };
        }
    }
}
