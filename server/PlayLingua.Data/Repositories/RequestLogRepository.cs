using Dapper;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace PlayLingua.Data
{
    public class RequestLogRepository : IRequeustLogRepository
    {
        private readonly string _connectionString;

        public RequestLogRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public RequestLogModel Add(RequestLogModel requestLog)
        {
            var sql =
				@"
				insert into [dbo].[RequestLogs] 
				(
					[StartTime],
					[UserId],
					[Path],
					[Method],
					[Body],
					[RequestSize],
					[IpAddress],
					[ProcessDuration],
					[Failed],
					[HadException],
					[Response],
					[ResponseStatusCode],
					[ResponseSize],
					[ExceptionTitle],
					[ExceptionMessage],
					[Environment]
				) VALUES
				(
					@StartTime,
					@UserId,
					@Path,
					@Method,
					@Body,
					@RequestSize,
					@IpAddress,
					@ProcessDuration,
					@Failed,
					@HadException,
					@Response,
					@ResponseStatusCode,
					@ResponseSize,
					@ExceptionTitle,
					@ExceptionMessage,
					@Environment
				);" + "SELECT CAST(SCOPE_IDENTITY() as int)";

            using var db = new SqlConnection(_connectionString);
            var id = db.Query<int>(sql, requestLog).Single();
            requestLog.Id = id;
            return requestLog;
        }

        public void Update(RequestLogModel requestLog)
        {
            using var db = new SqlConnection(_connectionString);
            db.Query(@"
							update [dbo].[RequestLogs] 
							SET [ProcessDuration] = @ProcessDuration,
								[Failed] = @Failed,
								[HadException] = @HadException,
								[Response] = @Response,
								[ResponseStatusCode] = @ResponseStatusCode,
								[ResponseSize] = @ResponseSize,
								[ExceptionTitle] = @ExceptionTitle,
								[ExceptionMessage] = @ExceptionMessage,
								[UserId] = @UserId
							WHERE Id = @Id
							",
            requestLog);
        }

    }
}
