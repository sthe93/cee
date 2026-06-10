namespace CBE.Web.Models
{
	public class UserModel
	{
		public int UserId { get; set; }
		public string Username { get; set; } = null!;
		public string FirstName { get; set; } = null!;
		public string Surname { get; set; } = null!;
		public string Nationality { get; set; } = null!;
		public string IdPassportNumber { get; set; } = null!;
		public DateTime DateOfBirth { get; set; }
		public string EmailAddress { get; set; } = null!;
		public string? AlternativeEmailAddress { get; set; }
		public string? CellPhoneNumber { get; set; }
		public string? TelephoneNumber { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public string Campus { get; set; } = null!;
		public string Title { get; set; } = null!;
		public string StaffNumber { get; set; } = null!;
		public string Position { get; set; } = null!;
		public bool IsAcademic { get; set; }
		public string Faculty { get; set; } = null!;
		public string Department { get; set; } = null!;
		public string Race { get; set; } = null!;
		public string Gender { get; set; } = null!;
		public string Disability { get; set; } = null!;
		public bool IsActive { get; set; }
		public string RoleId { get; set; } = null!;
		public string RoleName { get; set; } = null!;
		public string Createdby { get; set; } = null!;
		public string? Modifiedby { get; set; }
		public ResponseViewModel? messageViewModel { get; set; }

    }
}
