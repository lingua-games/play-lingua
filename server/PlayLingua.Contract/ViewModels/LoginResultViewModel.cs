using PlayLingua.Contract.ViewModels;

namespace PlayLingua.Contract.ViewModels
{
    public class LoginResultViewModel
    {
        public bool IsLogin { get; set; }
        public string Message { get; set; }
        public UserViewModel User { get; set; }
        public string Token { get; set; }
    }
}
