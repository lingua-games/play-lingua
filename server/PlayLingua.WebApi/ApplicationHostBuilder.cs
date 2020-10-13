using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PlayLingua.Adapter.InMemoryDb;
using PlayLingua.WebApi.Configuration;

namespace PlayLingua.WebApi
{
    public class ApplicationHostBuilder
    {
        private string[] _args;

        public ApplicationHostBuilder(string[] args)
        {
            _args = args;
        }

        public IHostBuilder Create()
        {
            return Host.CreateDefaultBuilder(_args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .ConfigureServices(ConfigureServices)
                        .Configure(Configure);
                });
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddRouting(options => { options.LowercaseUrls = true; });

            services.AddSwagger();

            services.AddInMemoryRepository();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            var env = app.ApplicationServices.GetService<IWebHostEnvironment>();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();

            app.AddSwagger();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
