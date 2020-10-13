using Microsoft.Extensions.DependencyInjection;
using PlayLingua.Adapter.InMemoryDb.Repositories;
using PlayLingua.Domain.Ports;

namespace PlayLingua.Adapter.InMemoryDb
{
    public static class RepositoryAdapter
    {
        public static void AddInMemoryRepository(this IServiceCollection services)
        {
            services.AddSingleton<IBookRepository, BookRepository>();
            services.AddSingleton<IChapterRepository, ChapterRepository>();
            services.AddSingleton<IWordRepository, WordRepository>();
        }
    }
}
