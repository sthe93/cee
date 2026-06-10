namespace CBE.Web.Models
{
    public class BeneficiaryOrganization
    {
          public int BeneficiaryId { get; set; }
        public string BeneficiaryName { get; set; } = null!;

        public string NgonporegistrationNumber { get; set; } = null!;

        public string DhetaccreditationNumber { get; set; } = null!;

        public string? OrganisationWebsite { get; set; }

        public string PhysicalAddress { get; set; } = null!;
        public int ProjectSustainabilityId { get; set; }
    }
}
