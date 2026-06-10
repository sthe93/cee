namespace CBE.Web.Models
{
    public class CreateProjectImplementationModel
    {
        public int ProjectImplementationId { get; set; }
        public int GeneralProjectId { get; set; }
        public string ProjectImplementationDescription { get; set; } = null!;
        public string BeneficiariesContributions { get; set; } = null!;
        public string ProjectEvaluation { get; set; } = null!;
        public bool? IsActive { get; set; }
    }
}
