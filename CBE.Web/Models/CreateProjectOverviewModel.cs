namespace CBE.Web.Models
{
    public class CreateProjectOverviewModel
    {
        public int ProjectOverviewId { get; set; }

        public int GeneralProjectId { get; set; }
        public string ProjectOverviewDescription { get; set; } = null!;
        public string ProjectSolution { get; set; } = null!;
        public string ProblemsIdentification { get; set; } = null!;
        public string ProjectObjectivesOutcomes { get; set; } = null!;
        public string ProjectBenefits { get; set; } = null!;
        public string? OtherTargetGroup { get; set; }
        public string[] TargetGroupId { get; set; } = null!;
        public IList<IFormFile> files { get; set; } = null!;
        public byte[]? AdditionalFile { get; set; } 
        public string? AdditionalFileName { get; set; }
        public string? AdditionalFileExtension { get; set; }
    }
}
