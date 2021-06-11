using Microsoft.Extensions.DependencyInjection;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;

namespace PlayLingua.Data
{
    public static class RepositoryAdapter
    {
        public static void AddRepository(this IServiceCollection services, string connectionString, string secret, string hashKey, EmailModel email)
        {
            services.AddTransient<IBookRepository, BookRepository>(x => new BookRepository(connectionString));
            services.AddTransient<IChapterRepository, ChapterRepository>(x => new ChapterRepository(connectionString));
            services.AddTransient<IWordRepository, WordRepository>(x => new WordRepository(connectionString));
            services.AddTransient<ILanguageRepository, LanguageRepository>(x => new LanguageRepository(connectionString));
            services.AddTransient<IAuthRepository, AuthRepository>(x => new AuthRepository(connectionString, secret, hashKey));
            services.AddTransient<ISelectedLanguagesRepository, SelectedLanguageRepository>(x => new SelectedLanguageRepository(connectionString));
            services.AddTransient<IUserRepository, UserRepository>(x => new UserRepository(connectionString, hashKey, email));
            services.AddTransient<IGameRepository, GameRepository>(x => new GameRepository(connectionString));
            services.AddTransient<IScoreRepository, ScoreRepository>(x => new ScoreRepository(connectionString));
            services.AddTransient<IRequeustLogRepository, RequestLogRepository>(x => new RequestLogRepository(connectionString));
            services.AddTransient<IAdminRepository, AdminRepository>(x => new AdminRepository(connectionString, email));
        }
    }
}
