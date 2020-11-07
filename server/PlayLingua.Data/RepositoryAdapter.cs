using Microsoft.Extensions.DependencyInjection;
using PlayLingua.Domain.Ports;

namespace PlayLingua.Data
{
    public static class RepositoryAdapter
    {
        public static void AddInDbRepository(this IServiceCollection services)
        {
            services.AddSingleton<IBookRepository, BookRepository>(x =>
             new BookRepository(@"Server=DESKTOP-H95V4NE\MSSQLSERVER_ARAS;Database=PlayLingua;User Id=sa;password=123456;Trusted_Connection=False;MultipleActiveResultSets=true;"));
        }
    }
}
