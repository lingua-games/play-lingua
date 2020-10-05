using Microsoft.Extensions.Hosting;

namespace PlayLingua.WebApi
{
    public class Program
    {
        public const string ApplicationName = "PlayLingua";

        public static void Main(string[] args)
        {
            var applicationHostBuilder = new ApplicationHostBuilder(args);
            var hostBuilder = applicationHostBuilder.Create();

            hostBuilder.Build().Run();
        }
    }
}
