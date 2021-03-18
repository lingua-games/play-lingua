namespace PlayLingua.Contract.ViewModels
{
    public class BookModel: BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TargetLanguageId { get; set; }
        public int SourceLanguageId { get; set; }
    }
}
