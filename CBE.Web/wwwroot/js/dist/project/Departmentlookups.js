$(document).ready(function () {

    GetFaculties();
   

    $(document.body).on('change', '.facultyDivision', function () {
        GetDepartments($(this).val());
    });

});


function GetFaculties() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/getfaculties",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $(".facultyDivision").empty();
                //$("#SchoolId").empty();
              //  $("#NewUserFacultyDivision").empty();
                $(".facultyDivision").append($('<option selected="selected" disabled="disabled" multiple></option>').val('0').html('-- Select Faculty/Division --'));
               // $("#SchoolId").append($('<option selected="selected"  multiple></option>').val(null).html('-- Select school --'));
               // $("#NewUserFacultyDivision").append($('<option selected="selected" disabled="disabled" multiple></option>').val('0').html('-- Select faculty --'));
                const data = JSON.parse(response);
                for (let i = 0; i < data.length; i++) {
                    $(".facultyDivision").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
                   // $("#SchoolId").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
                   // $("#NewUserFacultyDivision").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
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

function GetDepartments(facultyID, selectedDepartmentId) {

    $.ajax({
        type: "POST",
        url: config.serverPath + "lookup/getdepartments/" + facultyID,
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {

            if (textStatus === "success" && xhr.status === 200) {
                $(".DepartmentUnit").empty();
                $("#DepartmentResponsibleForProject").empty();
               // $("#NewUserDepartment").empty();
              //  $("#EditDepartmentUnit").empty();
                $(".DepartmentUnit").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Department --'));
               // $("#NewUserDepartment").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Department --'));
               // $("#EditDepartmentUnit").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Department --'));
                $("#DepartmentResponsibleForProject").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Department Reponsible --'));
                const data = JSON.parse(response);

                for (let i = 0; i < data.length; i++) {
                    $(".DepartmentUnit").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
                    $("#DepartmentResponsibleForProject").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
                  //  $("#NewUserDepartment").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
                    //$("#EditDepartmentUnit").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
                }
                if (selectedDepartmentId && selectedDepartmentId > 0) {
                    $(".DepartmentUnit").val(selectedDepartmentId);
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


