$(document).ready(function () {
    GetRoles();
   
});

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
                $("#ProgrammeCategory").empty();


                $("#RoleId").append($('<option selected></option>').val('0').html('-- Select roles --'));
                $.each(response.categories, function (index, item) {
                    $("#RoleId").append($('<option></option>').val(item.RoleId).html(item.Name));
                });

            } else {
                notifyr(response, 'alert alert-danger');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {

            notify(errorThrown, 'alert alert-danger');
        }
    });
}