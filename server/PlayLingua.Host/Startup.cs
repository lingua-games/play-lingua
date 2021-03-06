using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using PlayLingua.Data;
using PlayLingua.Domain.Models;
using PlayLingua.Host.Middlewares;
using System.Text;
using static PlayLingua.Host.Middlewares.RequestLog;

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
            services.Configure<Environment>(Configuration.GetSection("Environment"));
            services.AddControllers().AddNewtonsoftJson();

            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = "Lingua.security.com",
                    ValidAudience = "Lingua.security.com",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("secret").Value.ToString()))
                };
            })
                ;

            services.AddControllers();
            services.AddRouting(options => { options.LowercaseUrls = true; });
            services.AddRazorPages();
            services.AddHttpContextAccessor();

            //services.AddInMemoryRepository();
            services.AddRepository(
                Configuration.GetConnectionString("playLinguaConnection"),
                Configuration.GetSection("secret").Value,
                Configuration.GetSection("hashKey").Value,
                new EmailModel
                {
                    Username= Configuration.GetSection("email:username").Value,
                    Password = Configuration.GetSection("email:password").Value
                });

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
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // TODO: Below line should be disabled in production mode or at release time because we are going to
            // Release both backend and front-end in a package and with a common origin. 
            app.UseCors("Port-4000-allow-policy");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseRequestLog();
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
