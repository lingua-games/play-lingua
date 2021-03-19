using PlayLingua.Domain.Entities;

namespace PlayLingua.Domain.Models
{
    public class EditUserModel: BaseModel
    {
        public int Id { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public bool IsChangingPassword { get; set; }
        public string Token { get; set; }
        public int DefaultBaseLanguage { get; set; }
        public int DefaultTargetLanguage { get; set; }
    }
}
