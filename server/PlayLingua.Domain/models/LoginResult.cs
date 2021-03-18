using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.models
{
    public class LoginResult
    {
        public bool IsLogin { get; set; }
        public string Message { get; set; }
        public User User { get; set; }
        public string Token { get; set; }
    }
}
