using PlayLingua.Domain.models;

namespace PlayLingua.Domain.Models
{
    public class EditUserModel: SelectDefaultLanguageModel
    {
        public int Id { get; set; }
        public string CurrentPassword { get; set; }
        public string newPassword { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public bool IsChangingPassword { get; set; }
        public string Token { get; set; }
    }
}
