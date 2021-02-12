using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using PlayLingua.Domain.models;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace PlayLingua.Host.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class RequestLog
    {
        private readonly RequestDelegate _next;
		private Stopwatch _stopwatch = new Stopwatch();

		public RequestLog(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {

            await _next(httpContext);
        }

		public async Task<RequestLogModel> RequestIndiactor(HttpContext httpContext)
		{
			// TODO. ASK HOW TO FILL BELOW FIELDS
			// ActionTypeId - not now
			// EntityChanges - not now
			// QueryString - route parameter
			var requestAddress = httpContext.Request.Path;
			_stopwatch.Start();
			var request = new RequestLogModel
			{
				IpAddress = httpContext.Connection.RemoteIpAddress.ToString(),
				Path = requestAddress,
				Method = httpContext.Request.Method,
				StartTime = DateTime.Now,
			};

			if (httpContext.Request?.Body != null && !string.IsNullOrWhiteSpace(httpContext.Request.ContentType) &&
							!httpContext.Request.ContentType.StartsWith("multipart/form-data", StringComparison.InvariantCultureIgnoreCase))
			{
				#region Get Request Body
				request.Body = await new StreamReader(httpContext.Request.Body).ReadToEndAsync();
				var injectedRequestStream = new MemoryStream();
				var bytesToWrite = Encoding.UTF8.GetBytes(request.Body);
				injectedRequestStream.Write(bytesToWrite, 0, bytesToWrite.Length);
				injectedRequestStream.Seek(0, SeekOrigin.Begin);
				httpContext.Request.Body = injectedRequestStream;
				#endregion
			}

			request.RequestSize = httpContext.Request.ContentLength;
			if (!IgnoreRequest(requestAddress))
			{
				_dbContext.RequestLogs.Add(request);
				await _dbContext.SaveChangesAsync();
			}
			return new RequestLogModel
			{
				Id = request.Id,
				Body = request.Body,
				IpAddress = request.IpAddress,
				Method = request.Method,
				Path = request.Path,
				StartTime = request.StartTime,
				UserId = request.UserId,
				SavedLog = request,
			};
		}

	}



	// Extension method used to add the middleware to the HTTP request pipeline.
	public static class RequestLogExtensions
    {
        public static IApplicationBuilder UseRequestLog(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestLog>();
        }
    }
}
