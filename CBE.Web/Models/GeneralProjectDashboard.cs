namespace CBE.Web.Models
{
    public class GeneralProjectDashboard
    {
        public int GeneralProjectId { get; set; }
        public string ProjectReference { get; set; } = null!;
        public int SustainableDevelopmentGoalId { get; set; }
        public int? DepartmentId { get; set; }
        public int? FacultyId { get; set; }
        public string Title { get; set; } = null!;
        public int ProjectDurationId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int ProjectTypeId { get; set; }
        public string ProjectAddress { get; set; } = null!;
        public int LocationScopeId { get; set; }
        public int ProjectEffortId { get; set; }
        public int? DepartmentResponsibleId { get; set; }
        public string? PrimaryProjectOwneContactNumbr { get; set; }
        public string? PrimaryProjectOwnerName { get; set; }
        public int? NumberOfUjstaffInvolved { get; set; }
        public int? NumberOfUjstudentInvolved { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; } = null!;
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? IsActive { get; set; }
        public string SustainableDevelopmentGoalDescription { get; set; } = null!;
        public string ProjectTypeName { get; set; } = null!;
        public string? FacultyName { get; set; }
        public string? FacultyAcronym { get; set; }
        public string? DepartmentName { get; set; }
        public string LocationScopeName { get; set; } = null!;
        public string? DepartmentNameResponsible { get; set; }
        public string ProjectEffortName { get; set; } = null!;
        public string Username { get; set; } = null!;
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string CreatedUserRole { get; set; } = null!;
        public string? ModifiedUser { get; set; }
        public string? ModifiedUserRole { get; set; }
        public string? ProjectDuration { get; set; }
        public string? SecondaryProjectOwnerName { get; set; }
        public string? SecondaryProjectOwnerSurname { get; set; }
        public string? SecondaryProjectEmailAddress { get; set; }
        public string? SecondaryProjectOwnerContactNumber { get; set; }
        public string ProjectLogoExtension { get; set; } = null!;
    }
}
