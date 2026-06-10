
namespace CBE.Web.Models
{
    public class CreateUserModel
    {
        public string Username { get; set; } = null!;
        public int RoleId { get; set; }
        public int? FacultyId { get; set; }
        public int? DepartmentId { get; set; }
    }
}

