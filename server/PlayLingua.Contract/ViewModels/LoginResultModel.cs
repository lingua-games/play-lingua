using PlayLingua.Contract.ViewModels;

namespace PlayLingua.Contract.ViewModels
{
    public class LoginResultModel
    {
        public bool IsLogin { get; set; }
        public string Message { get; set; }
        public UserModel User { get; set; }
        public string Token { get; set; }
    }
}
