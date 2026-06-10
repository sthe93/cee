using System.Text.Json.Serialization;

namespace CBE.Web.Models
{
    public class CreateGeneralProjectModel
    {
        public IList<IFormFile> files { get; set; } = null!;
        public int GeneralProjectId { get; set; }
        public byte[]? ProjectLogo { get; set; } = null;
        public string? ProjectLogoFileName { get; set; } = null;
        public string? ProjectLogoExtension { get; set; } = null;
        public string ProjectReference { get; set; } = null!;
        public string Title { get; set; } = null!;
        public DateTime StartDate { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? EndDate { get; set; }
        public string ProjectAddress { get; set; } = null!;
        public int? NumberOfUjstaffInvolved { get; set; }
        public int? NumberOfUjstudentInvolved { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public int SustainableDevelopmentGoalId { get; set; }
        public int ProjectTypeId { get; set; }
        public int LocationScopeId { get; set; }
        public int ProjectEffortId { get; set; }
        public int ProjectDurationId { get; set; }
        public int? CommunityEngagementUnitId { get; set; }
        public int? CampusId { get; set; }
        public decimal? NumberOfVolunteerHoursStaff { get; set; }
        public decimal? NumberOfVolunteerHoursStudent { get; set; }
        public int? NumberOfYears { get; set; }
        public bool IsFlagship { get; set; }
        public int FacultyId { get; set; }
        public int DepartmentId { get; set; }
        public int DepartmentResponsibleId { get; set; }
        public List<ProjectProgress>? ProjectProgresses { get; set; }
        public List<ProjectVolunteerDetail>? ProjectVolunteerDetails { get; set; }
    }


    public partial class ProjectVolunteerDetail
    {
        public int ProjectVolunteerDetailsId { get; set; }
        public int GeneralProjectId { get; set; }
        public string Name { get; set; } = null!;
        public string ContactNumber { get; set; } = null!;
        public string Type { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
    }
    public partial class ProjectProgress
    {
        public int ProjectProgressId { get; set; }
        public string ProjectProgressName { get; set; } = null!;
        public int GeneralProjectId { get; set; }
        public int Year { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
    }
}
