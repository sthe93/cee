namespace CBE.Web.Models
{
	public class UpdateUserModel
    {
        public int UserId { get; set; }
        public string? RoleName { get; set; }
        public string? RoleId { get; set; }
        public bool IsActive { get; set; }
        public int? FacultyId { get; set; }
        public int? DepartmentId { get; set; }
        public string? Faculty { get; set; }
        public string? Department { get; set; }
    }
}
