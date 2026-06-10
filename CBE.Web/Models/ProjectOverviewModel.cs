namespace CBE.Web.Models
{
    public class ProjectOverviewModel
    {
        public int ProjectOverviewId { get; set; }
        public int GeneralProjectId { get; set; }
        public string ProjectOverviewDescription { get; set; } = null!;
        public string ProjectSolution { get; set; } = null!;
        public string ProblemsIdentification { get; set; } = null!;
        public string ProjectObjectivesOutcomes { get; set; } = null!;
        public string ProjectBenefits { get; set; } = null!;
        public string CreatedBy { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? IsActive { get; set; }
        public string? OtherTargetGroup { get; set; }
        public List<int>? TargetGroupList { get; set; }
    }
}
