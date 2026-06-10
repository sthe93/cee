namespace CBE.Web.Models
{
    public class UpdateGeneralProjectModel
    {
        public int GeneralProjectId { get; set; }
        public byte[]? ProjectLogo { get; set; }
        public string? ProjectLogoFileName { get; set; }
        public string? ProjectLogoExtension { get; set; }
        public string Title { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ProjectAddress { get; set; } = null!;
        public string ContactNumbr { get; set; } = null!;
        public string EmailAddress { get; set; } = null!;
        public int NumberOfUjstaffInvolved { get; set; }
        public int NumberOfUjstudentInvolved { get; set; }
        public string SecondaryProjectOwnerUserName { get; set; } = null!;
        public string? SecondaryProjectOwnerFullnames { get; set; }
        public string? SecondaryProjectOwnerSurname { get; set; }
        public string? SecondaryProjectEmailAddress { get; set; }
        public string? SecondaryProjectOwnerContactNumber { get; set; }

        public bool? IsActive { get; set; }
        public int SustainableDevelopmentGoalId { get; set; }
        public int DepartmentId { get; set; }
        public int FacultyId { get; set; }
        public int ProjectTypeId { get; set; }
        public int LocationScopeId { get; set; }
        public int ProjectEffortId { get; set; }
        public int DepartmentResponsibleId { get; set; }
        public int ProjectDurationId { get; set; }
    }
}
