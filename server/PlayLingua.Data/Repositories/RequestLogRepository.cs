using Dapper;
using PlayLingua.Domain.models;
using PlayLingua.Domain.Ports;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace PlayLingua.Data
{
    public class RequestLogRepository : IRequeustLogRepository
    {
        private IDbConnection db;
        public RequestLogRepository(string connectionString)
        {
            db = new SqlConnection(connectionString);
        }

        public RequestLogModel Add(RequestLogModel requestLog)
        {
            db.Close();
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
					[ExceptionMessage]
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
					@ExceptionMessage
				);" + "SELECT CAST(SCOPE_IDENTITY() as int)";

            var id = db.Query<int>(sql, requestLog).Single();
            requestLog.Id = id;
            return requestLog;

        }

        public void Update(RequestLogModel requestLog)
        {
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
", requestLog);
		}
	}
}
