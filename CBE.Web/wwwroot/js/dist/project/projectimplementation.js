$(document).ready(function () {

    if (document.getElementById("GeneralProjectId").value != "0") {
        GetProjectImplementation();
    }

    $("#btnProjectImplementation").click(function (e) {
        if (document.getElementById("DescribeProjectImplementation").value === "") {
            notify('Please enter project implementation details.', 'alert alert-danger');
            document.getElementById('DescribeProjectImplementation').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        let BeneficiariesContributionsValue = $("#BeneficiariesContributions").val();
        if (BeneficiariesContributionsValue === undefined || BeneficiariesContributionsValue === "0" || BeneficiariesContributionsValue === "" || BeneficiariesContributionsValue === null) {
            notify('Please enter beneficiaries contributions', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        if (document.getElementById("EvaluateProjectImplementation").value === "") {
            notify('Please evaluate project implementation', 'alert alert-danger');
            document.getElementById('EvaluateProjectImplementation').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        let formData = new FormData;
        e.preventDefault();
        formData.append("ProjectImplementationDescription", $("#DescribeProjectImplementation").val());
        formData.append("BeneficiariesContributions", $("#BeneficiariesContributions").val());
        formData.append("ProjectEvaluation", $("#EvaluateProjectImplementation").val());
        formData.append("ProjectImplementationId", $("#ProjectImplementationId").val());
        $.ajax({
            type: "POST",
            url: config.serverPath + "project/implementation",
            contentType: false,
            processData: false,
            data: formData,
            headers: {
                "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
            },
            success: function (response, textStatus, xhr) {
                if (textStatus === "success" && xhr.status === 200) {
                    notify('Project Implementation, Monitoring and Evaluation created successfully', 'alert alert-success');
                    btnNextStepper("step-5");

                }
                else {
                    notify('Project implementation: Internal Server Error', 'alert alert-danger');
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                notify('Project implementation: Internal Server Error', 'alert alert-danger');
            }
        });
    });
});


function GetProjectImplementation() {
    $.ajax({
        type: "GET",
        url: config.serverPath + "project/GetProjectImplementation",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                if (response != "") {
                    const data = JSON.parse(response);
                  
                    document.getElementById('ProjectImplementationId').value = data.projectImplementationId;
                    document.getElementById('DescribeProjectImplementation').value = data.projectImplementationDescription;
                    document.getElementById('BeneficiariesContributions').value = data.beneficiariesContributions;
                    document.getElementById('EvaluateProjectImplementation').value = data.projectEvaluation;
                }
            } else {
                notify('Partnership: Internal Server Error', 'alert alert-danger');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {

            notify('Partnership: Internal Server Error', 'alert alert-danger');
        }
    });
}


