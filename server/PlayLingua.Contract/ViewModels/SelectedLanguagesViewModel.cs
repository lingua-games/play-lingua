using System.ComponentModel.DataAnnotations;

namespace PlayLingua.Contract.ViewModels
{
    public class SelectedLanguagesViewModel: BaseViewModel
    {
        public int Id { get; set; }
        [Required]
        public string BaseLanguages { get; set; }
        [Required]
        public string TargetLanguages { get; set; }
        public int UserId { get; set; }

    }
}
