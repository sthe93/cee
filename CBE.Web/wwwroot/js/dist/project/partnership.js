$(document).ready(function () {

    if (document.getElementById("GeneralProjectId").value != "0") {
        GetPartnership();
    }

    $('#dvOtherProjectPartnerlabel').hide();
    $('#dvOtherProjectPartnerDetails').hide();


    $("#btnPartnership").click(function (e) {
        let otherProjectPartnerValueSELECTED = $("#OtherProjectPartner option:selected").val();
        let formData = new FormData;
       //if (otherProjectPartnerValueSELECTED != 5) {

            let otherProjectPartnerValue = $("#OtherProjectPartner option:selected").val();
            if (otherProjectPartnerValue === undefined || otherProjectPartnerValue === "0" || otherProjectPartnerValue === "" || otherProjectPartnerValue === null) {
                notify('Please select project partner', 'alert alert-danger');
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }

            let otherProjectPartnerDetails = $("#OtherProjectPartnerDetails").val();
            if (otherProjectPartnerValueSELECTED == 4) {
                if (otherProjectPartnerDetails == "") {
                    notify('Please enter other project partner', 'alert alert-danger');
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }

            }
            if (Count_Characters(document.getElementById("OtherProjectPartnerDetails").value) > 30) {
                notify('Other Project Partner Details characters must not be more than 30', 'alert alert-danger');
                document.getElementById("OtherProjectPartnerDetails").focus();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }

            if (document.getElementById("OtherMajorPartiesInvolved").value == "") {
                notify('Please enter stakeholders involved', 'alert alert-danger');
                document.getElementById("OtherMajorPartiesInvolved").focus();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
            if (Count_Characters(document.getElementById("OtherMajorPartiesInvolved").value) > 30) {
                notify('Stakeholders involved characters must not be more than 30', 'alert alert-danger');
                document.getElementById("OtherMajorPartiesInvolved").focus();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }

            if (document.getElementById("NumberOfProjectBeneficiaries").value == "") {
                notify('Please enter number of target beneficiaries', 'alert alert-danger');
                document.getElementById("NumberOfProjectBeneficiaries").focus();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }


            if (isNaN(document.getElementById("NumberOfProjectBeneficiaries").value)) {
                notify('Number of project beneficiaries is not a valid number.', 'alert alert-danger');
                document.getElementById("NumberOfProjectBeneficiaries").focus();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
            let xNumber = document.getElementById("NumberOfProjectBeneficiaries").value;
            const xCnumber = parseInt(xNumber);
            if (xCnumber <= 0) {
                notify('Number of project beneficiaries must not be less than or equal to 0.', 'alert alert-danger');
                document.getElementById("NumberOfProjectBeneficiaries").focus();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }

            e.preventDefault();

            formData.append("ProjectPartnerId", $("#OtherProjectPartner option:selected").val());
            formData.append("OtherPartnerName", $("#OtherProjectPartnerDetails").val());
            formData.append("MajorParties", $("#OtherMajorPartiesInvolved").val());
            formData.append("NumberOfTargetBeneficiaries", $("#NumberOfProjectBeneficiaries").val());
            formData.append("PartnershipId", $("#PartnershipId").val());
        //}
        //else {
        //    e.preventDefault();
        //    formData.append("ProjectPartnerId", $("#OtherProjectPartner option:selected").val());         
        //    formData.append("MajorParties", "None");
        //    formData.append("NumberOfTargetBeneficiaries", 0);
        //    formData.append("PartnershipId", $("#PartnershipId").val());
        //}
        
       
      
        $.ajax({
            type: "POST",
            url: config.serverPath + "project/createpartnership",
            contentType: false,
            processData: false,
            data: formData,
            headers: {
                "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
            },
            success: function (response, textStatus, xhr) {
                if (textStatus === "success" && xhr.status === 200) {
                    notify('Project partnership information created successfully', 'alert alert-success');

                    btnNextStepper("step-3");

                }
                else {
                    notify('Internal Server Error', 'alert alert-danger');
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                notify('Internal Server Error', 'alert alert-danger');
            }
        });
    });

});

function onOtherProjectChange(e) {
    if ($("#OtherProjectPartner option:selected").val() == 4) {
        $('#dvOtherProjectPartnerlabel').show();
        $('#dvOtherProjectPartnerDetails').show();

        $('#OtherMajorPartiesInvolved').show();
        $('#LabelOtherMajorPartiesInvolved').show();

        $('#NumberOfProjectBeneficiaries').show();
        $('#LabelNumberOfProjectBeneficiaries').show();
    }
    else if ($("#OtherProjectPartner option:selected").val() == 5) {
        
        //$('#OtherMajorPartiesInvolved').val('').hide();
        //$('#LabelOtherMajorPartiesInvolved').hide();

        //$('#NumberOfProjectBeneficiaries').val('').hide();
        //$('#LabelNumberOfProjectBeneficiaries').hide();
        
        $('#OtherProjectPartnerDetails').val('');
        $('#dvOtherProjectPartnerlabel').hide();
        $('#dvOtherProjectPartnerDetails').hide();
    }
    else {
        $('#OtherMajorPartiesInvolved').show();
        $('#LabelOtherMajorPartiesInvolved').show();

        $('#NumberOfProjectBeneficiaries').show();
        $('#LabelNumberOfProjectBeneficiaries').show();


        $('#OtherProjectPartnerDetails').val('');
        $('#dvOtherProjectPartnerlabel').hide();
        $('#dvOtherProjectPartnerDetails').hide();
    }
}




function GetPartnership() {


    $.ajax({
        type: "GET",
        url: config.serverPath + 'project/GetPartnership',
        dataType: "json",
        data: null,
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
          

                setTimeout(function () {
                    document.getElementById('OtherProjectPartner').value = response.projectPartnerId;
                    document.getElementById('OtherMajorPartiesInvolved').value = response.majorParties;
                    document.getElementById('NumberOfProjectBeneficiaries').value = response.numberOfTargetBeneficiaries;
                    document.getElementById('OtherProjectPartnerDetails').value = response.otherPartnerName;
                    document.getElementById('PartnershipId').value = response.partnershipId;
                    if (response.projectPartnerId == 4) {
                        $('#dvOtherProjectPartnerlabel').show();
                        $('#dvOtherProjectPartnerDetails').show();

                        $('#OtherMajorPartiesInvolved').show();
                        $('#LabelOtherMajorPartiesInvolved').show();

                        $('#NumberOfProjectBeneficiaries').show();
                        $('#LabelNumberOfProjectBeneficiaries').show();
                    }
                    else if ($("#OtherProjectPartner option:selected").val() == 5) {

                        //$('#OtherMajorPartiesInvolved').val('').hide();
                        //$('#LabelOtherMajorPartiesInvolved').hide();

                        //$('#NumberOfProjectBeneficiaries').val('').hide();
                        //$('#LabelNumberOfProjectBeneficiaries').hide();

                        $('#OtherProjectPartnerDetails').val('');
                        $('#dvOtherProjectPartnerlabel').hide();
                        $('#dvOtherProjectPartnerDetails').hide();
                    }

                }, 500);


            } else {
               // $.notify('Partnership: Internal Server Error', 'error');
                notify('Partnership: Internal Server Error', 'alert alert-danger');

            }
        },
        error: function (jqXhr, textStatus, errorThrown) {

           // $.notify('Partnership: Internal Server Error', 'error');
            notify('Partnership: Internal Server Error', 'alert alert-danger');
        }
    });
}