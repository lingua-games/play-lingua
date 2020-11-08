using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PlayLingua.Data;

namespace PlayLingua.Host
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson();
            services.AddControllers();
            services.AddRouting(options => { options.LowercaseUrls = true; });

            services.AddSwagger();

            //services.AddInMemoryRepository();
            services.AddInDbRepository(Configuration.GetConnectionString("playLinguaConnection"));

            // TODO: Below line should be disabled in production mode or at release time because we are going to
            // Release both backend and front-end in a package and with a common origin. 
            services.AddCors(options =>
            {
                options.AddPolicy("Port-4000-allow-policy",
                                  builder =>
                                  {
                                      builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                                  });
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            // TODO: Below line should be disabled in production mode or at release time because we are going to
            // Release both backend and front-end in a package and with a common origin. 
            app.UseCors("Port-4000-allow-policy");

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
