$(document).ready(function () {
    $('.js-example-basic-single').select2();

    if (document.getElementById("GeneralProjectId").value != "0") {
        GetProjectSustainability();
    } else {
        $("#divBeneficiaryPanel").append($($divNewBeneficiary));   
    }
    $('#dvOtherEnsureProjectExistenceDetails').hide();


    $("#btnSustainability").click(function (e) {
        let beneficiaryOrganizationArray = [];
     
        if (document.getElementById("StateHowProjectFunded").value === "") {
            notify('Please state how the project is funded', 'alert alert-danger');
            document.getElementById('StateHowProjectFunded').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (Count_Characters(document.getElementById("StateHowProjectFunded").value) > 500) {

            notify('Funder name characters must not be more than 500', 'alert alert-danger');
            document.getElementById("StateHowProjectFunded").focus();
            return false;
        }

        if (document.getElementById("BudgetAllocated").value === "") {
            notify('Please enter budget allocated', 'alert alert-danger');
            document.getElementById('BudgetAllocated').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        let xNumber = document.getElementById("BudgetAllocated").value;
        const xCnumber = parseInt(xNumber);
        if (xCnumber <= 0) {
            notify('Budget allocated must not be less than or equal to 0.', 'alert alert-danger');
            document.getElementById("BudgetAllocated").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (document.getElementById("NameOfFunderOrDonor").value === "") {
            notify('Please enter name of funder or donor', 'alert alert-danger');
            document.getElementById('BudgetAllocated').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let continuedExistenceOfYourProjectIdValue = $("#continuedExistenceOfYourProjectId option:selected").val();
        if (continuedExistenceOfYourProjectIdValue === undefined || continuedExistenceOfYourProjectIdValue === "0" || continuedExistenceOfYourProjectIdValue === "" || continuedExistenceOfYourProjectIdValue === null) {
            notify('Please select continued existence of your project', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        let continuedExistenceOfYourProjectIdValueSELECTED = $("#continuedExistenceOfYourProjectId option:selected").val();
        let otherEnsureProjectExistenceDetails = $("#OtherEnsureProjectExistenceDetails").val();
        if (continuedExistenceOfYourProjectIdValueSELECTED == 4) {
            if (otherEnsureProjectExistenceDetails == "") {
                notify('Please enter other ways to ensure project continual existence', 'alert alert-danger');
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }

        }
        if (Count_Characters(document.getElementById("OtherEnsureProjectExistenceDetails").value) > 30) {
            notify('Other ensure project continual existence details characters must not be more than 30', 'alert alert-danger');
            document.getElementById("OtherEnsureProjectExistenceDetails").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
       
        if (document.getElementById("Years").value === "") {
            notify('Please enter number of years', 'alert alert-danger');
            document.getElementById('Years').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        let yNumber = document.getElementById("Years").value;
        const yCnumber = parseInt(yNumber);
        if (yCnumber <= 0) {
            notify('Number of years must not be less than or equal to 0.', 'alert alert-danger');
            document.getElementById("Years").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let _Years = document.getElementById('Years').value;
        let yearsSize = _Years.length;
        if (yearsSize > 2) {
            notify('Please make years max limit to be 2 digits', 'alert alert-danger');
            document.getElementById('Years').value = "";
            e.preventDefault();
            e.stopImmediatePropagation();
        }

        if (document.getElementById("NumberOfDirectBeneficiaries").value === "") {
            notify('Please enter number of direct beneficiaries', 'alert alert-danger');
            document.getElementById('NumberOfDirectBeneficiaries').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let zNumber = document.getElementById("NumberOfDirectBeneficiaries").value;
        const zCnumber = parseInt(zNumber);
        if (zCnumber <= 0) {
            notify('Number of direct beneficiaries must not be less than or equal to 0.', 'alert alert-danger');
            document.getElementById("NumberOfDirectBeneficiaries").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let _NumberOfDirectBeneficiaries = document.getElementById('NumberOfDirectBeneficiaries').value;
        let beneficiariesSize = _NumberOfDirectBeneficiaries.length;
        if (beneficiariesSize > 10) {
            notify('Please make number of direct beneficiarie max limit to be 10 digits', 'alert alert-danger');
            document.getElementById('Years').value = "";
            e.preventDefault();
            e.stopImmediatePropagation();
        }

        if (document.getElementById("Town").value === "") {
            notify('Please enter town name', 'alert alert-danger');
            document.getElementById('Town').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let provinceIdValue = $("#ProvinceId option:selected").val();
        if (provinceIdValue === undefined || provinceIdValue === "0" || provinceIdValue === "" || provinceIdValue === null) {
            notify('Please select province name', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }


        $("#divBeneficiaryPanel").find(".beneficiaryOrgPanel").each(function (i, beneficiaryOrgPanel) {
            let $inputBeneficiaryName = $(beneficiaryOrgPanel).find('input[id^=BeneficiaryName]');
            let $inputNGONPOregistrationNumber = $(beneficiaryOrgPanel).find('input[id^=NGONPOregistrationNumber]');
            let $inputDHETAccreditationNumber = $(beneficiaryOrgPanel).find('input[id^=DHETAccreditationNumber]');
            let $inputPhysicalAddress = $(beneficiaryOrgPanel).find('textarea[id^=PhysicalAddress]');
            let $inputOrganisationWebsite = $(beneficiaryOrgPanel).find('input[id^=OrganisationWebsite]');

            if ($inputBeneficiaryName.val() != "" || $inputNGONPOregistrationNumber.val() != "" ||
                $inputDHETAccreditationNumber.val() != "" || $inputPhysicalAddress.val() != "") {

                if ($inputBeneficiaryName.val() === "") {
                    notify('Please enter beneficiary Name', 'alert alert-danger');
                    $inputBeneficiaryName.focus();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }

                if ($inputNGONPOregistrationNumber.val() === "") {
                    notify('Please enter NGO/NPO registration number', 'alert alert-danger');
                    $inputNGONPOregistrationNumber.focus();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }

                if ($inputDHETAccreditationNumber.val() === "") {
                    notify('Please enter DHET accreditation number', 'alert alert-danger');
                    $inputDHETAccreditationNumber.focus();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }

                if ($inputPhysicalAddress.val() === "") {
                    notify('Please enter physical address', 'alert alert-danger');
                    $inputPhysicalAddress.focus();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }
            }

            beneficiaryOrganizationArray.push({
                beneficiaryId : 0,
                beneficiaryName: $inputBeneficiaryName.val(),
                ngonporegistrationNumber: $inputNGONPOregistrationNumber.val(),
                dhetaccreditationNumber: $inputDHETAccreditationNumber.val(),
                organisationWebsite: $inputOrganisationWebsite.val(),
                physicalAddress: $inputPhysicalAddress.val()                
            });
        });


        let formData = new FormData;
        e.preventDefault();
        formData.append("Funds", $("#StateHowProjectFunded").val());
        formData.append("BudgetAllocated", $("#BudgetAllocated").val());
        formData.append("FunderName", $("#NameOfFunderOrDonor").val());
        formData.append("ProjectExistenceId", $("#continuedExistenceOfYourProjectId option:selected").val());
        formData.append("OtherProjectExistence", $("#OtherEnsureProjectExistenceDetails").val());
        formData.append("Years", $("#Years").val());
        formData.append("NumberOfDirectBeneficiaries", $("#NumberOfDirectBeneficiaries").val());
        formData.append("Town", $("#Town").val());
        formData.append("ProvinceId", $("#ProvinceId option:selected").val());
        formData.append("SchoolName", $("#School").val());
        formData.append("BeneficiaryName", $("#BeneficiaryName").val());
        formData.append("NGONPOregistrationNumber", $("#NGONPOregistrationNumber").val());
        formData.append("DHETAccreditationNumber", $("#DHETAccreditationNumber").val());
        formData.append("OrganisationWebsite", $("#OrganisationWebsite").val());
        formData.append("PhysicalAddress", $("#PhysicalAddress").val());
        formData.append("ProjectSustainabilityId", $("#ProjectSustainabilityId").val());  
        let provinces = $("#ProvinceId option:selected").toArray().map(item => item.value).join(',') 
        formData.append("ProvincesIds", JSON.stringify(provinces));
        formData.append("ProvincesList", provinces);
        formData.append("BeneficiaryOrganizations", beneficiaryOrganizationArray);
        formData.append("BeneficiaryOrganizationsSerialized", JSON.stringify( beneficiaryOrganizationArray));
       
        $.ajax({
            type: "POST",
            url: config.serverPath + "project/sustainability",
            contentType: false,
            processData: false,
            data: formData,
            headers: {
                "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
            },
            success: function (response, textStatus, xhr) {
                if (textStatus === "success" && xhr.status === 200) {
                    notify('Project Sustainability created successfully', 'alert alert-success');
                    btnNextStepper("step-6");
                }
                else {
                    notify('Sustainability: Internal Server Error', 'alert alert-danger');
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                notify('Sustainability: Internal Server Error', 'alert alert-danger');
            }
        });
    });

    let $btnAddBeneficiaryOrg = $("#btnAddBeneficiaryOrg");
    $btnAddBeneficiaryOrg.on("click", function (e) {      
        let $divSpatrator = `<div style="border-radius: 5px; border: 2px solid #7777;border-color:#ec5800;width:98%;margin:auto;"></div>`;      
        $("#divBeneficiaryPanel").append($divSpatrator).append($divNewBeneficiary);
    });
});

function onContinuedProjectExistanceChange(e) {
    if ($("#continuedExistenceOfYourProjectId option:selected").val() == 4) {
        $('#dvOtherEnsureProjectExistenceDetails').show();
    }
    else {
        $('#OtherEnsureProjectExistenceDetails').val('');
        $('#dvOtherEnsureProjectExistenceDetails').hide();

    }
}


function GetProjectSustainability() {

       $.ajax({
        type: "GET",
           url: config.serverPath + "project/GetProjectSustainability",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                if (response != "") {
                    const data = JSON.parse(response);

                    setTimeout(function () {

                    document.getElementById('ProjectSustainabilityId').value = data.projectSustainabilityId;
                    document.getElementById('StateHowProjectFunded').value = data.funds;
                    document.getElementById('BudgetAllocated').value = data.budgetAllocated;
                    document.getElementById('NameOfFunderOrDonor').value = data.funderName;
                    document.getElementById('continuedExistenceOfYourProjectId').value = data.projectExistenceId;

                    document.getElementById('Years').value = data.years;
                    document.getElementById('NumberOfDirectBeneficiaries').value = data.numberOfDirectBeneficiaries;
                    document.getElementById('Town').value = data.town;
                    document.getElementById('ProvinceId').value = data.provinceId;
                    document.getElementById('School').value = (data.schoolName == null ? "" : data.schoolName);
                    
                    $.each(data.projectSustainabilityProvinces, function (i, obj) {
                        $("#ProvinceId option[value='" + obj.provinceId + "']").prop("selected", true).trigger('change');                          
                    });
                        let $newBlock;
                        if (data.beneficiaryOrganizations.length > 0) {
                            $.each(data.beneficiaryOrganizations, function (i, obj) {
                                let $borderDiv = `<div style = "border-radius: 5px; 
                                                            border: 2px solid #7777;
                                                            border-color:#ec5800;
                                                            width:98%;
                                                            margin:auto;">
                                                            </div>`;

                                let $elBeneficiaryOrgnization = ` ${i != 0 ? $borderDiv : ""}
                           <div  class='beneficiaryOrgPanel'> <div class="form-group row">
                                <label class="col-md-3 col-form-label" for= "BeneficiaryName${i}"> Name</label>
                                <div class="col-md-3">
                                    <input type="text" 
                                            id="BeneficiaryName" 
                                            class="form-control input-lg"
                                            data-tippy-content="Full name of the beneficiary organization."
                                            placeholder="Beneficiary name" 
                                            onchange="allLetterBeneficiaryName(this)" 
                                            value="${obj.beneficiaryName}"/>
                                </div>
                                <label class="col-md-3 col-form-label" for="NGONPOregistrationNumber">NGO/NPO Reg No.</label>
                                <div class="col-md-3">
                                    <input type="text" 
                                            id="NGONPOregistrationNumber" 
                                            class="form-control input-lg" 
                                            data-tippy-content="Provide the official registration number if the organization is registered as an NGO/NPO. If not applicable, state 'Not Applicable'."
                                            placeholder="NGO/NPO registration number" 
                                            value="${obj.ngonporegistrationNumber}"/>
                                </div>
                            </div >
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label" for="DHETAccreditationNumber">DHET Accreditation No.</label>
                                <div class="col-md-3">
                                    <input type="text" 
                                            id="DHETAccreditationNumber" 
                                            class="form-control input-lg" 
                                            data-tippy-content="If accredited by the Department of Higher Education and Training, provide the accreditation number. If not, indicate 'Not Applicable'."
                                            placeholder="DHET accreditation number" 
                                            value="${obj.dhetaccreditationNumber}"/>
                                </div>
                                <label class="col-md-3 col-form-label" for="OrganisationWebsite">Website</label>
                                <div class="col-md-3">
                                            <input type="text" 
                                            id="OrganisationWebsite" 
                                            class="form-control input-lg" 
                                            placeholder="Organization's website"
                                            value="${obj.organisationWebsite}"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label" for="PhysicalAddress">Physical address</label>
                                <div class="col-md-3">
                                    <textarea class="form-control" 
                                                id="PhysicalAddress"
                                                maxlength="490"
                                                rows="2" 
                                                cols="100" 
                                                placeholder="Physical address"
                                                >${obj.physicalAddress}</textarea>
                                </div>
                                <label class="col-md-3 col-form-label" for="nmm"> </label>
                                <div class="col-md-3">
                                </div>
                            </div></div>`;

                                /*$("#divBeneficiaryPanel").append($($elBeneficiaryOrgnization));*/

                                $newBlock = $($elBeneficiaryOrgnization);
                                $("#divBeneficiaryPanel").append($newBlock);
                                InitiateToolTip($newBlock);
                            });
                        } else {
                            /*$("#divBeneficiaryPanel").append($($divNewBeneficiary));*/
                            $newBlock = $($divNewBeneficiary);
                            $("#divBeneficiaryPanel").append($newBlock);
                            InitiateToolTip($newBlock);
                        }

                    if (data.projectExistenceId == 4) {
                        $('#dvOtherEnsureProjectExistenceDetails').show();
                        document.getElementById('OtherEnsureProjectExistenceDetails').value = data.otherProjectExistence;
                        }
                    }, 500);
                }
            } else {
                notify(response, 'alert alert-danger');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {

            notify(errorThrown, 'alert alert-danger');
        }
    });
}

function InitiateToolTip($newBlock) {
    tippy($('[data-tippy-content]', $newBlock).toArray(), {
        placement: 'top-start',
        animation: 'scale',
        arrow: true,
        theme: 'transparent-theme',
        interactive: true,
        delay: [100, 200],
        duration: [250, 200],
    });
}

let $divNewBeneficiary = `      
        <div class='beneficiaryOrgPanel'>
        <div class="form-group row">
            <label
                class="col-md-3 col-form-label"
                data-tippy-content="Full name of the beneficiary organization."
                for= "BeneficiaryName"> Name
            </label>
            <div class="col-md-3">
                <input type="text" id="BeneficiaryName" class="form-control input-lg" placeholder="Beneficiary name" onchange="allLetterBeneficiaryName(this)" />
            </div>

            <label class="col-md-3 col-form-label"
                   data-tippy-content="Provide the official registration number if the organization is registered as an NGO/NPO. If not applicable, state 'Not Applicable'."
                   for="NGONPOregistrationNumber">NGO/NPO Reg No.
            </label>
            <div class="col-md-3">
                <input type="text" id="NGONPOregistrationNumber" class="form-control input-lg" placeholder="NGO/NPO registration number" />
            </div>
        </div >

        <div class="form-group row">
            <label
                class="col-md-3 col-form-label"
                data-tippy-content="If accredited by the Department of Higher Education and Training, provide the accreditation number. If not, indicate 'Not Applicable'."
                for="DHETAccreditationNumber">DHET Accreditation No.
            </label>
            <div class="col-md-3">
                <input type="text" id="DHETAccreditationNumber" class="form-control input-lg" placeholder="DHET accreditation number" />
            </div>

            <label
                class="col-md-3 col-form-label"
                for="OrganisationWebsite">Website
            </label>
            <div class="col-md-3">
                <input type="text" id="OrganisationWebsite" class="form-control input-lg" placeholder="Organization's website" />
            </div>
        </div>

        <div class="form-group row">
            <label class="col-md-3 col-form-label" for="PhysicalAddress">Physical address</label>
            <div class="col-md-3">
                <textarea class="form-control" id="PhysicalAddress" rows="2" cols="100" maxlength="490" placeholder="Physical address"></textarea>
            </div>
            <label class="col-md-3 col-form-label" for="nmm"> </label>
            <div class="col-md-3">
            </div>
        </div>
        </div>`;