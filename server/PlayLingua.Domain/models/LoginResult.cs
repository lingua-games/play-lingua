using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.Models
{
    public class LoginResult
    {
        public bool IsLogin { get; set; }
        public string Message { get; set; }
        public UserModel User { get; set; }
        public string Token { get; set; }
    }
}
