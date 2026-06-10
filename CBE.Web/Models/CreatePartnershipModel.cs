namespace CBE.Web.Models
{
    public class CreatePartnershipModel
    {
        public int GeneralProjectId { get; set; }
        public int ProjectPartnerId { get; set; }
        public string MajorParties { get; set; } = null!;
        public string? OtherPartnerName { get; set; }
        public int NumberOfTargetBeneficiaries { get; set; }
        public int PartnershipId { get; set; }
    }
}
