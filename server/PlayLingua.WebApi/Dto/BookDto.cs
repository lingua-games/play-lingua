using PlayLingua.Domain.Entities;
using System;

namespace PlayLingua.WebApi.Dto
{
    public class BookDto
    {
        public Guid BookId { get; set; }
        public string Name { get; set; }

        public static BookDto Map(Book entity)
        {
            return new BookDto
            {
                BookId = entity.BookId,
                Name   = entity.Name
            };
        }
    }
}
