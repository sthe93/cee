namespace CBE.Web.Models
{
    public class CreateProjectContactInformationModel
    {
        public int ProjectContactInformationId { get; set; }
        public int GeneralProjectId { get; set; }
        public string PrimaryProjectOwnerName { get; set; } = null!;
        public string PrimaryProjectOwneSurname { get; set; } = null!;
        public string PrimaryProjectOwneContactNumber { get; set; } = null!;
        public string PrimaryProjectOwneEmailAddress { get; set; } = null!;
        public string SecondaryProjectOwnerName { get; set; } = null!;
        public string? SecondaryProjectOwnerSurname { get; set; }
        public string? SecondaryProjectEmailAddress { get; set; }
        public string? SecondaryProjectOwnerContactNumber { get; set; }
        public int ProjectOwnerId { get; set; }
        //public int FacultyId { get; set; }
        //public int DepartmentId { get; set; }
        //public int DepartmentResponsibleId { get; set; }
        public bool? IsActive { get; set; }
    }
}
