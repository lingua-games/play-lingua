using System;

namespace PlayLingua.Domain.Models
{
	public class RequestLogModel
	{
		public long Id { get; set; }
		public DateTime StartTime { get; set; }
		public int? UserId { get; set; }
		public string Path { get; set; }
		public string QueryString { get; set; }
		public string Method { get; set; }
		public string Body { get; set; }
		public long? RequestSize { get; set; }
		public string IpAddress { get; set; }
		public double ProcessDuration { get; set; }
		public bool Failed { get; set; }
		public bool HadException { get; set; }
		public string Response { get; set; }
		public int ResponseStatusCode { get; set; }
		public long? ResponseSize { get; set; }
		public string ExceptionTitle { get; set; }
        public string Environment { get; set; }
        public string ExceptionMessage { get; set; }
		//public ActionTypeEnum? ActionTypeId { get; set; }
		//public ICollection<RequestException> Exceptions { get; set; }
		//public ICollection<EntityChangeLog> EntityChanges { get; set; }
	}

}
