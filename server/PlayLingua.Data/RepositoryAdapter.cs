using Microsoft.Extensions.DependencyInjection;
using PlayLingua.Domain.Ports;

namespace PlayLingua.Data
{
    public static class RepositoryAdapter
    {
        public static void AddRepository(this IServiceCollection services, string connectionString, string secret)
        {
            services.AddSingleton<IBookRepository, BookRepository>(x => new BookRepository(connectionString));
            services.AddSingleton<IChapterRepository, ChapterRepository>(x => new ChapterRepository(connectionString));
            services.AddSingleton<IWordRepository, WordRepository>(x => new WordRepository(connectionString));
            services.AddSingleton<ILanguageRepository, LanguageRepository>(x => new LanguageRepository(connectionString));
            services.AddSingleton<IAuthRepository, AuthRepository>(x => new AuthRepository(connectionString, secret));
            services.AddSingleton<ISelectedLanguagesRepository, SelectedLanguageRepository>(x => new SelectedLanguageRepository(connectionString));
            services.AddTransient<IUserRepository, UserRepository>(x => new UserRepository(connectionString));
            services.AddTransient<IGameRepository, GameRepository>(x => new GameRepository(connectionString));
            services.AddTransient<IScoreRepository, ScoreRepository>(x => new ScoreRepository(connectionString));
            services.AddTransient<IRequeustLogRepository, RequestLogRepository>(x => new RequestLogRepository(connectionString));
        }
    }
}
