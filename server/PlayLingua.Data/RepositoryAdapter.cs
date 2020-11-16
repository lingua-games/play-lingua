using Microsoft.Extensions.DependencyInjection;
using PlayLingua.Domain.Ports;

namespace PlayLingua.Data
{
    public static class RepositoryAdapter
    {
        public static void AddRepository(this IServiceCollection services, string connectionString)
        {
            services.AddSingleton<IBookRepository, BookRepository>(x => new BookRepository(connectionString));
            services.AddSingleton<IChapterRepository, ChapterRepository>(x => new ChapterRepository(connectionString));
            services.AddSingleton<IWordRepository, WordRepository>(x => new WordRepository(connectionString));
            services.AddSingleton<ILanguageRepository, LanguageRepository>(x => new LanguageRepository(connectionString));
        }
    }
}
