namespace CBE.Web.Models
{
    public class GalleryImage
    {
        public string ImageName { get; set; } = null!;
        public string ImageByteString { get; set; } = null!;
        public int GeneralProjectId { get; set; }
    }
}
