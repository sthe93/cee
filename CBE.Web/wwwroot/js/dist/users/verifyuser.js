$(document).ready(function () {


    ClearModal();

    $(document.body).on('click', '#btnAddPrimaryProjectOwner', function () {
        $('#newProjectOwnerModalForm').show();
        $('#hdTypeName').val("Primary");
    });

    $(document.body).on('click', '#btnAddSecondaryProjectOwner', function () {
        $('#newProjectOwnerModalForm').show();
        $('#hdTypeName').val("Secondary");
    });


    $(document.body).on('click', '.CancelModal', function () {

        $('#newProjectOwnerModalForm').hide();
        $('#newProjectOwnerModalForm').modal('hide');
        $('body').removeClass('modal-open');
        $('body').css('padding-right', '0px');
        $('.modal-backdrop').remove();

        ClearText();
    });

    $(document.body).on('click', '#btnVerifyUser', function () {



        if ($('#NewUserUsername').val() === "") {
            notify("Please enter username", 'alert alert-danger');
            return;
        }

        let formData = new FormData;
        formData.append("username", $("#NewUserUsername").val());
        let dataformname = $(this).attr("dataformname");
        $.ajax({
            type: "POST",
            url: config.serverPath + "user/GetUserDetails",
            data: formData,
            headers: {
                "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
            },
            contentType: false,
            processData: false,
            success: function (response, textStatus, xhr) {
                const obj = JSON.parse(response);
                //console.log(obj);
                if (obj.message == null) {

                    if (textStatus === "success" && xhr.status === 200) {
                        if (response.staffNumber !== null) {

                            if ($('#hdTypeName').val() == "Secondary") {
                                SecondaryContact(obj, dataformname);
                            } else {
                                PrimaryyContact(obj, dataformname);
                            }

                            if (obj.facultyId && obj.facultyId > 0) {
                                GetDepartments(obj.facultyId, obj.departmentId);
                            }

                            notify("User verified successfully", 'alert alert-success');
                        }
                        else {
                            notify(obj.message, 'alert alert-danger');
                        }

                    } else {
                        notify(obj.message, 'alert alert-danger');
                    }
                }
                else {
                    notify(obj.message, 'alert alert-danger');
                };

            },
            error: function (jqXhr, textStatus, errorThrown) {
                notify(jqXhr.responseText, 'alert alert-danger');
            }
        });
    });

});


function ClearModal() {
    document.getElementById('NewUserFirstName').value = '';
    document.getElementById('NewUserSurname').value = '';
    document.getElementById('NewUserPosition').value = '';

}



function ClearText() {
    $("#NewUserUsername").val('');
    $("#NewUserFirstName").val('');
    $("#NewUserSurname").val('');
    $("#NewUserPosition").val('');

    $("#NewUserDepartment").val('');
    $("#NewUserFacultyDivision").val('');


}

function SecondaryContact(obj, dataformname) {
    $("#NewUserFirstName").val(obj.firstName);
    $("#NewUserSurname").val(obj.surname);
    $("#NewUserPosition").val(obj.position);
    if (dataformname == "manageuser") {
        if ($("#hdRoleName").val() == "Super Administrator") {
            $("#NewUserFacultyDivision").val(obj.facultyId);
            $("#NewUserDepartment").val(obj.departmentId);
        }
    }
    else {
        $("#NewUserFacultyDivision").val(obj.faculty);
        $("#NewUserDepartment").val(obj.department);
    }


    $("#SecondaryProjectOwnerFullnames").val(obj.firstName);
    $("#SecondaryProjectOwnerSurname").val(obj.surname);
    $("#SecondaryProjectEmailAddress").val(obj.emailAddress);
    $("#SecondaryProjectOwnerContactNumber").val(obj.telephoneNumber);
}

function PrimaryyContact(obj, dataformname) {
    $("#NewUserFirstName").val(obj.firstName);
    $("#NewUserSurname").val(obj.surname);
    $("#NewUserPosition").val(obj.position);
    if (dataformname == "manageuser") {
        if ($("#hdRoleName").val() == "Super Administrator") {
            $("#NewUserFacultyDivision").val(obj.facultyId);
            $("#NewUserDepartment").val(obj.departmentId);
        }
    }
    else {
        $("#NewUserFacultyDivision").val(obj.faculty);
        $("#NewUserDepartment").val(obj.department);
    }

    $("#myfirstname").val(obj.firstName);
    $("#mysurname").val(obj.surname);
    $("#EmailAddress").val(obj.emailAddress);
    $("#ContactNumber").val(obj.telephoneNumber);
}