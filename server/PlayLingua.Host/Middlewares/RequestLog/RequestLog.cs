using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using PlayLingua.Host.Controllers;
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PlayLingua.Host.Middlewares
{
    public class RequestLog : BaseController
    {
        private readonly RequestDelegate _next;
        private readonly Stopwatch _stopwatch = new Stopwatch();
        private readonly IRequeustLogRepository _requeustLogRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RequestLog(RequestDelegate next, IRequeustLogRepository requeustLogRepository, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _requeustLogRepository = requeustLogRepository;
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var log = new RequestLogModel();
            try
            {
                if (httpContext.Request.Path != "/" && !httpContext.Request.Path.ToString().Contains(".js"))
                {
                    log = await RequestIndiactor(httpContext);
                    using (var memStream = new MemoryStream())
                    {
                        var originalResponseBody = httpContext.Response.Body;
                        httpContext.Response.Body = memStream;
                        httpContext.Items.Add("RequestLog", log);

                        await _next(httpContext);

                        memStream.Position = 0;
                        log.Response = new StreamReader(memStream).ReadToEnd();
                        memStream.Position = 0;
                        await memStream.CopyToAsync(originalResponseBody);
                        httpContext.Response.Body = originalResponseBody;
                    }
                    ResponseIndiactor(httpContext, log);
                }
                else
                {
                    await _next(httpContext);
                }
            }
            catch (Exception ex)
            {
                ExceptionIndiactor(httpContext, log, ex);
            }
        }

        public void ExceptionIndiactor(HttpContext httpContext, RequestLogModel requestLog, Exception ex)
        {
            try
            {
                requestLog.ResponseStatusCode = httpContext.Response.StatusCode;
                requestLog.ExceptionMessage = JsonConvert.SerializeObject(ex);
                requestLog.ExceptionTitle = ex.Message;
                requestLog.HadException = true;
                requestLog.Failed = true;
                _stopwatch.Stop();
                requestLog.ProcessDuration = _stopwatch.Elapsed.TotalSeconds;
                _requeustLogRepository.Update(requestLog);
            }
            catch (Exception loggingException)
            {
                throw (loggingException);
                // STORE THE LOG ON DISC
            }
        }

        public void ResponseIndiactor(HttpContext httpContext, RequestLogModel requestLog)
        {
            if (_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier) != null)
            {
                requestLog.UserId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            }
            requestLog.ResponseStatusCode = httpContext.Response.StatusCode;
            requestLog.ResponseSize = httpContext.Response.ContentLength;
            if (requestLog.ResponseSize > 5000)
            {
                requestLog.Response = "Too long";
            }
            requestLog.Failed = httpContext.Response.StatusCode != 200;
            _stopwatch.Stop();
            requestLog.ProcessDuration = _stopwatch.Elapsed.TotalMilliseconds;
            _requeustLogRepository.Update(requestLog);
        }

        public async Task<RequestLogModel> RequestIndiactor(HttpContext httpContext)
        {
            _stopwatch.Start();
            var request = new RequestLogModel
            {
                IpAddress = httpContext.Connection.RemoteIpAddress.ToString(),
                Path = httpContext.Request.Path,
                Method = httpContext.Request.Method,
                StartTime = DateTime.Now,
            };

            if (httpContext.Request?.Body != null && !string.IsNullOrWhiteSpace(httpContext.Request.ContentType) &&
                            !httpContext.Request.ContentType.StartsWith("multipart/form-data", StringComparison.InvariantCultureIgnoreCase))
            {
                #region Get Request Body
                // This condition is because I dont want to save usurs password into my database

                request.Body = await new StreamReader(httpContext.Request.Body).ReadToEndAsync();
                var injectedRequestStream = new MemoryStream();
                var bytesToWrite = Encoding.UTF8.GetBytes(request.Body);
                injectedRequestStream.Write(bytesToWrite, 0, bytesToWrite.Length);
                injectedRequestStream.Seek(0, SeekOrigin.Begin);
                httpContext.Request.Body = injectedRequestStream;

                if (request.Body.Contains("password\":"))
                {
                    request.Body = "Not visible(password is in content)";
                }
                #endregion
            }

            request.RequestSize = httpContext.Request.ContentLength;
            request.Id = _requeustLogRepository.Add(request).Id;
            return new RequestLogModel
            {
                Id = request.Id,
                Body = request.Body,
                IpAddress = request.IpAddress,
                Method = request.Method,
                Path = request.Path,
                StartTime = request.StartTime,
                UserId = request.UserId,
            };
        }
    }



    public static class RequestLogExtensions
    {
        public static IApplicationBuilder UseRequestLog(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestLog>();
        }
    }
}
