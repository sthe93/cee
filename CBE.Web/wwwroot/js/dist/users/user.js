$(document).ready(function () {

    ClearModal();

   

    $(document.body).on('click', '#btnCancel', function () {

        document.location = config.serverPath + "user/Index";
    });

    $(document.body).on('click', '#btnNewUser', function () {

        GetRoles();
        ClearModal();
        $("#newUserModalForm").modal("show");
    });
});


function ClearModal() {
    document.getElementById('NewUserUsername').value = '';
    document.getElementById('NewUserFirstName').value = '';
    document.getElementById('NewUserSurname').value = '';
    document.getElementById('NewUserPosition').value = '';
    //document.getElementById('NewUserFacultyDivision').value = '';
    //document.getElementById('NewUserDepartment').value = '';
}

function onEdit(e) {

    GetRoles();
    document.getElementById('lblUserId').value = e.dataset.userid;
    $.ajax({
        type: "GET",
        url: config.serverPath + 'User/getUserById/' + e.dataset.userid,
        dataType: "json",
        data: null,
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        success: function (response, textStatus, xhr) {

            if (textStatus === "success" && xhr.status === 200) {
               
                GetDepartments(response.facultyId);
                setTimeout(function () {
                    document.getElementById('FullName').value = response.firstName + " " + response.surname;
                    document.getElementById('Username').value = response.username;
                    document.getElementById('RoleId').value = response.roleId;
                    if (document.getElementById('hdRoleName').value =="Super Administrator") {
                        document.getElementById('EditfacultyDivision').value = response.facultyId;
                        document.getElementById('EditDepartmentUnit').value = response.departmentId;
                   }
                    lblUserId.dataset.userId = response.userId;
                    if (response.roleId == 1) {
                        $('.dvfaculty').hide();
                        $('.dvdeprtment').hide();
                    }

                }, 800);
            } else {
                notify('User: Internal Server Error', 'alert alert-danger');

            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            notify('User: Internal Server Error', 'alert alert-danger');
        }
    });
}

function GetRoles() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "role/GetRoles",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {

                $("#RoleId").empty();
                $("#NewUserRoleId").empty();

                $("#RoleId").append($('<option selected></option>').val('0').html('-- Select roles --'));

                if (response.length != 1) {
                    $("#NewUserRoleId").append($('<option selected></option>').val('0').html('-- Select roles --'));
                }

                $.each(response, function (index, item) {
                    $("#RoleId").append($('<option></option>').val(item.RoleId).html(item.Name));

                    if (response.length == 1) {
                        $("#NewUserRoleId").append($('<option selected></option>').val(item.RoleId).html(item.Name));
                        $("#NewUserRoleId").attr("disabled", "disabled")
                    } else {
                        $("#NewUserRoleId").append($('<option></option>').val(item.RoleId).html(item.Name));
                    }
                });

            } else {
                notify(response, 'alert alert-danger');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {

            notify(errorThrown, 'alert alert-danger');
        }
    });
}



function AddNewUser() {

    //let RoleValue = $("#NewUserRoleId option:selected").val();
    //if (RoleValue === undefined || RoleValue === "0" || RoleValue === "" || RoleValue === null) {
    //    notify("Please select role", 'alert alert-danger');
    //    return false;
    //}

    let RoleValue = $("#NewUserRoleId option:selected").val();
    if (RoleValue === undefined || RoleValue === "0" || RoleValue === "" || RoleValue === null) {
        notify("Please select role", 'alert alert-danger');
        return false;
    }
    if (RoleValue != "1") {

        let EditfacultyDivision = $("#NewUserFacultyDivision option:selected").val();
        if (EditfacultyDivision === undefined || EditfacultyDivision === "0" || EditfacultyDivision === "" || EditfacultyDivision === null) {

            notify('Please select faculty', 'alert alert-danger');
            return false;
        }

        let EditDepartmentUnit = $("#NewUserDepartment option:selected").val();
        if (EditDepartmentUnit === undefined || EditDepartmentUnit === "0" || EditDepartmentUnit === "" || EditDepartmentUnit === null) {

            notify('Please select department', 'alert alert-danger');
            return false;
        }
    }
    
    let formData = new FormData;

    formData.append("RoleId", $("#NewUserRoleId option:selected").val());
    formData.append("Username", $("#NewUserUsername").val());
    formData.append("Surname", $("#NewUserSurname").val());
    formData.append("FirstName", $("#NewUserFirstName").val());
    formData.append("DepartmentId", $("#NewUserDepartment").val());
    /*    formData.append("Department", $("#DepartmentUnit").val());*/
    formData.append("FacultyId", $("#NewUserFacultyDivision").val());
    /*    formData.append("Faculty", $("#facultyDivision").val());*/
    formData.append("Position", $("#NewUserPosition").val());
    $.ajax({
        type: "POST",
        url: config.serverPath + "User/Add",
        data: formData,
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {

            if (textStatus === "success" && xhr.status === 200) {
                notify("User created successfully", "alert alert-success");
                document.location = config.serverPath + "User/Index";
            }
            else {
                notify("Error creating a system user", 'alert alert-danger');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            notify(jqXhr.responseText, 'alert alert-danger');
        }
    });
}


function onRoleNewUserChange(e) {
    if ($("#NewUserRoleId option:selected").val() == 1) {
        $('.dvfaculty').hide();
        $('.dvdeprtment').hide();
    }
    else {
        $('.dvfaculty').show();
        $('.dvdeprtment').show();
    }
}

function onRoleEdidUserChange(e) {
    if ($("#RoleId option:selected").val() == 1) {
        $('.dvfaculty').hide();
        $('.dvdeprtment').hide();
    }
    else {
        $('.dvfaculty').show();
        $('.dvdeprtment').show();
    }
}
function onEditUser() {

    let formData = new FormData;

    let RoleId = $("#RoleId option:selected").val();
    if (RoleId === undefined || RoleId === "0" || RoleId === "" || RoleId === null) {

        notify('Please select role', 'alert alert-danger');
        return false;
    }

    if (RoleId != "1") {
        let EditfacultyDivision = $("#EditfacultyDivision option:selected").val();
        if (EditfacultyDivision === undefined || EditfacultyDivision === "0" || EditfacultyDivision === "" || EditfacultyDivision === null) {

            notify('Please select faculty', 'alert alert-danger');
            return false;
        }

        let EditDepartmentUnit = $("#EditDepartmentUnit option:selected").val();
        if (EditDepartmentUnit === undefined || EditDepartmentUnit === "0" || EditDepartmentUnit === "" || EditDepartmentUnit === null) {

            notify('Please select department', 'alert alert-danger');
            return false;
        }
    }
    formData.append("UserId", document.getElementById('lblUserId').value);
    formData.append("RoleId", $("#RoleId option:selected").val());
    formData.append("FacultyId", $("#EditfacultyDivision option:selected").val());
    formData.append("DepartmentId", $("#EditDepartmentUnit option:selected").val());
    formData.append("IsActive", true);
    formData.append("Faculty", $("#EditfacultyDivision option:selected").text());
    formData.append("Department", $("#EditDepartmentUnit option:selected").text());
    $.ajax({
        type: "POST",
        url: config.serverPath + 'User/update',
        data: formData,
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                window.location.href = config.serverPath + 'User/Index';
                notify("User details has been updated scuccessfully.", 'alert alert-success');

            } else {
                notify("User: Internal server error", 'alert alert-danger');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            notify("User: Internal server error", 'alert alert-danger');
        }
    });
}


function onActivateDeactivate(e) {
    let postData = new FormData;
    postData.append("UserId", e.dataset.userid);
    postData.append("Status", e.dataset.userstatus);

    $.ajax({
        type: "POST",
        url: config.serverPath + 'User/activeDeactivate',
        contentType: false,
        processData: false,
        data: postData,
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                notify("User has been activated/deactivated", 'alert alert-success');
                setTimeout(function () {

                    window.location.href = config.serverPath + 'User/Index';
                }, 1500);


            } else {

                notify(response, 'alert alert-danger');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {

            notify(jqXhr.responseText, 'alert alert-danger');
        }
    });
}