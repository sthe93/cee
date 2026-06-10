namespace CBE.Web.Helper.Interfaces
{
    public interface IAppSession
    {
        int? UserId { get; set; }
        string? RoleName { get; set; }
        string? Token { get; }
        string? Username { set; get; }
        string? FirstName { set; get; }
        string? FullName { set; get; }
        string? CanCreateProjects { set; get; }
        string? CanAddUser { set; get; }
        string? CanEditProjects { set; get; }
        int? GeneralProjectId { set; get; }
        string? LastName { set; get; }
        string? TelephoneNumber { set; get; }
        public int? DepartmentId { set; get; }
        public int? FacultyId { set; get; }
        public string? DepartmentName { set; get; }
        public string? FacultyName { set; get; }
    }
}
