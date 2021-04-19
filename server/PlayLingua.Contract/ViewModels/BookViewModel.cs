namespace PlayLingua.Contract.ViewModels
{
    public class BookViewModel: BaseViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TargetLanguageId { get; set; }
        public int BaseLanguageId { get; set; }
    }
}
