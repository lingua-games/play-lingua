namespace PlayLingua.Contract.ViewModels
{
    public class ChapterModel: BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int BookId { get; set; }
    }
}
