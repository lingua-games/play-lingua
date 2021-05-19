namespace PlayLingua.Domain.Models
{
    public class ResultModel<T>
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
        public T Data { get; set; }
    }
}
