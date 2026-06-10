namespace CBE.Web.Models
{
	public class DashboardFilterModel
    {
		public int SDG { get; set; }
		public string? ProjectName { get; set; }
		public string? ProjectOwner { get; set; }
		public string? ReferenceNumber { get; set; }
        public int CallingDashboard { get; set; }
        public string? FacultyDivision { get; set; }
    }
}
