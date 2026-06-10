namespace CBE.Web.Models
{
    public class CreateProjectSustainabilityModel
    {
        public int ProjectSustainabilityId { get; set; }

        public int GeneralProjectId { get; set; }
        public string Funds { get; set; } = null!;
        public string BudgetAllocated { get; set; } = null!;
        public string FunderName { get; set; } = null!;
        public int ProjectExistenceId { get; set; }
        public string? OtherProjectExistence { get; set; }
        public int Years { get; set; }
        public int NumberOfDirectBeneficiaries { get; set; }
        public string Town { get; set; } = null!;
        public int ProvinceId { get; set; }
        public string? SchoolName { get; set; }
        public string? BeneficiaryName { get; set; } 
        public string? NgonporegistrationNumber { get; set; } 
        public string? DhetaccreditationNumber { get; set; }
        public string? OrganisationWebsite { get; set; }
        public string? PhysicalAddress { get; set; } 
        public List<int> ProvincesIds { get; set; } = new List<int>();
        public string? ProvincesList { get; set; }
        public List<BeneficiaryOrganization> BeneficiaryOrganizations { get; set; } = new List<BeneficiaryOrganization>();
        public string BeneficiaryOrganizationsSerialized { get; set; } = null!;
    }
}
