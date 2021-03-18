namespace PlayLingua.Contract.ViewModels
{
    public class ChapterViewModel: BaseViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int BookId { get; set; }
    }
}
