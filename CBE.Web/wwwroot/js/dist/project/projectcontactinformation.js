$(document).ready(function () {

    if (document.getElementById("GeneralProjectId").value != "0") {
        GetProjectContact();
    }




    $("#btnProjectContactInformation").click(function (e) {
        let projectOwnerId = $("#projectOwner").val();
        if (projectOwnerId === undefined || projectOwnerId === "0" || projectOwnerId === "" || projectOwnerId === null) {
            notify('Please enter project owner', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (document.getElementById("myfirstname").value === "") {
            notify('Project owner contact name is required', 'alert alert-danger');
            document.getElementById('myfirstname').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (document.getElementById("mysurname").value === "") {
            notify('Project owner contact surname is required', 'alert alert-danger');
            document.getElementById('mysurname').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (document.getElementById("ContactNumber").value === "") {
            notify('Project owner contact contact number is required', 'alert alert-danger');
            document.getElementById('ContactNumber').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (document.getElementById("EmailAddress").value === "") {
            notify('Project owner contact email is required', 'alert alert-danger');
            document.getElementById('EmailAddress').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }



        let formData = new FormData;
        e.preventDefault();
        formData.append("ProjectContactInformationId", $("#projectContactInformationId").val());
        formData.append("SecondaryProjectOwnerName", $("#SecondaryProjectOwnerFullnames").val());
        formData.append("SecondaryProjectOwnerSurname", $("#SecondaryProjectOwnerSurname").val());
        formData.append("SecondaryProjectOwnerContactNumber", $("#SecondaryProjectOwnerContactNumber").val());
        formData.append("SecondaryProjectEmailAddress", $("#SecondaryProjectEmailAddress").val());

        formData.append("PrimaryProjectOwnerName", $("#myfirstname").val());
        formData.append("PrimaryProjectOwneSurname", $("#mysurname").val());
        formData.append("PrimaryProjectOwneContactNumber", $("#ContactNumber").val());
        formData.append("PrimaryProjectOwneEmailAddress", $("#EmailAddress").val());
        formData.append("ProjectOwnerId", $("#projectOwner").val());
        $.ajax({
            type: "POST",
            url: config.serverPath + "project/createProjectContact",
            contentType: false,
            processData: false,
            data: formData,
            headers: {
                "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
            },
            success: function (response, textStatus, xhr) {
                if (textStatus === "success" && xhr.status === 200) {
                    notify('Project contact information created successfully', 'alert alert-success');
                    btnNextStepper("step-2");

                }
                else {
                    notify('Project contact information: Internal Server Error', 'alert alert-danger');
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                notify(jqXhr.responseText, 'alert alert-danger');
            }
        });
    });
});


function GetProjectContact() {
    $.ajax({
        type: "GET",
        url: config.serverPath + "project/GetProjectContact",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                if (response != "") {
                    const data = JSON.parse(response);
                    document.getElementById('projectContactInformationId').value = data.projectContactInformationId;
                    document.getElementById('SecondaryProjectOwnerFullnames').value = data.secondaryProjectOwnerName;
                    document.getElementById('SecondaryProjectOwnerSurname').value = data.secondaryProjectOwnerSurname;
                    document.getElementById('SecondaryProjectOwnerContactNumber').value = data.secondaryProjectOwnerContactNumber;
                    document.getElementById('SecondaryProjectEmailAddress').value = data.secondaryProjectEmailAddress;
                    document.getElementById('projectOwner').value = data.projectOwnerId;

                    document.getElementById('myfirstname').value = data.primaryProjectOwnerName;
                    document.getElementById('mysurname').value = data.primaryProjectOwneSurname;
                    document.getElementById('ContactNumber').value = data.primaryProjectOwneContactNumber;
                    document.getElementById('EmailAddress').value = data.primaryProjectOwneEmailAddress;

                    if ($("#communityEngagementUnit option:selected").val() == 1) {
                        $('#btnAddPrimaryProjectOwner').hide();
                    }
                    else {
                        $('#btnAddPrimaryProjectOwner').show();
                    }
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

function onprojectOwnerChange(e) {
    if ($("#projectOwner option:selected").val() == 1) {
        $('#btnAddPrimaryProjectOwner').hide();
        document.getElementById('myfirstname').value = document.getElementById('hdmyfirstname').value;
        document.getElementById('mysurname').value = document.getElementById('hdmysurname').value;
        document.getElementById('ContactNumber').value = document.getElementById('hdContactNumber').value;
        document.getElementById('EmailAddress').value = document.getElementById('hdEmailAddress').value;
    }
    else {
        $('#btnAddPrimaryProjectOwner').show();
    }
}


