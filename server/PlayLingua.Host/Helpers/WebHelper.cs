using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PlayLingua.Host.Helpers
{
	public static class WebHelper
	{
		public static IDictionary<string, List<FieldError>> ToDictionary(this ModelStateDictionary modelState)
		{
			return modelState.ToDictionary(x => x.Key, x => x.Value.Errors
			.Select(e => new FieldError
			{
				Message = e.ErrorMessage
			}).ToList());
		}

		public static string GetFullMessage(this Exception ex)
		{
			string text = ex.GetType().ToString() + ":" + ex.Message;
			if (ex.InnerException == null)
			{
				return text;
			}
			return text + Environment.NewLine + ex.InnerException.GetFullMessage();
		}
	}
}

public class FieldError
{
	public string Message { get; set; }
}