namespace PlayLingua.Contract.ViewModels
{
    public class UserScoreViewModel: BaseViewModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Email { get; set; }
        public string GuestCode { get; set; }
        public string GameName { get; set; }
        public int? BookId { get; set; }
        public int? ChapterId { get; set; }
        public float Score { get; set; }
        public int Count { get; set; }
        public bool IsFeedback { get; set; }
    }
}
