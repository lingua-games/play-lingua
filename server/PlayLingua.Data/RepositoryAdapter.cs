using Microsoft.Extensions.DependencyInjection;
using PlayLingua.Domain.Ports;

namespace PlayLingua.Data
{
    public static class RepositoryAdapter
    {
        public static void AddInDbRepository(this IServiceCollection services, string connectionString)
        {
            services.AddSingleton<IBookRepository, BookRepository>(x => new BookRepository(connectionString));
        }
    }
}
