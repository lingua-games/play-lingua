using System;

namespace PlayLingua.Contract.ViewModels
{
    public class InvitationViewModel: BaseViewModel
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public LanguageViewModel TargetLanguage { get; set; }
        public LanguageViewModel BaseLanguage { get; set; }
        public BookViewModel Book { get; set; }
        public ChapterViewModel Chapter { get; set; }
        public string GeneratedLink { get; set; }
        public int Count { get; set; }
        public string PlayerName { get; set; }
        public string Game { get; set; }
        public string HtmlText { get; set; }
        public bool IsOpened { get; set; }
        public DateTime? OpenedDate { get; set; }
        public Guid UniqueKey { get; set; }
    }
}
