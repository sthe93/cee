$(document).ready(function () {
    GetFaculties();
    GetProjectType();
    GetProjectEffort();
    GetProjectPartner();
    GetLocations();
    //GetSustainableDevelopmentGoals();
    GetBeneficiariesContributions();
    GetTargetSectorGroup();
    ProjectExistences();
    GetProvinces();
     GetCampus();
    GetCommunityEngagementUnit();
    GetProjectDurations();

    //$(document.body).on('change', '#facultyDivision', function () {
    //    GetDepartments($(this).val());
    //});
});

function GetProjectDurations() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/projectduration",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $("#ProjectDuration").empty();
                $("#ProjectDuration").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('..Select Duration...'));
                const data = JSON.parse(response);
                for (let i = 0; i < data.length; i++) {
                    $("#ProjectDuration").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
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

//function GetSustainableDevelopmentGoals() {
//    $.ajax({
//        type: "POST",
//        url: config.serverPath + "Lookup/sustainabledevelopmentgoals",
//        headers: {
//            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
//        },
//        contentType: false,
//        processData: false,
//        success: function (response, textStatus, xhr) {
//            if (textStatus === "success" && xhr.status === 200) {
//                $("#SustainableDevelopmentGoals").empty();
//                $("#SustainableDevelopmentGoals").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Sustainable Development Goals --'));
//                const data = JSON.parse(response);
//                for (let i = 0; i < data.length; i++) {
//                    $("#SustainableDevelopmentGoals").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
//                }
//            } else {
//                $.notify(response, 'alert alert-danger');
//            }
//        },
//        error: function (jqXhr, textStatus, errorThrown) {
//            notify(errorThrown, 'alert alert-danger');
//        }
//    });
//}

function GetLocations() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/locationscope",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $("#ProjectLocation").empty();
                $("#ProjectLocation").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Project location --'));
                const data = JSON.parse(response);
                for (let i = 0; i < data.length; i++) {
                    $("#ProjectLocation").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
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

function GetBeneficiariesContributions() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/beneficiariescontributions",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $("#BeneficiariesContributions").empty();
                $("#BeneficiariesContributions").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Beneficiaries Contributions --'));
                const data = JSON.parse(response);
                for (let i = 0; i < data.length; i++) {
                    $("#BeneficiariesContributions").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
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


function GetTargetSectorGroup() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/targetgroups",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $("#targetGroup").empty();
                const data = JSON.parse(response);
             



                $.each(data, function (index) {
                    $('.checkboxlist').append("<input type='checkbox' style='font-weight: normal;' name='targetGroup' value='" + data[index]['id'] + "' id='" + data[index]['id'] + "'/> " + data[index]['name'] + "<br/>");
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

function GetProjectPartner() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/projectpartner",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $("#OtherProjectPartner").empty();
                $("#OtherProjectPartner").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Project Partner --'));
                const data = JSON.parse(response);
                for (let i = 0; i < data.length; i++) {
                    $("#OtherProjectPartner").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
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

function ProjectExistences() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/projectexistence",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {

                $("#continuedExistenceOfYourProjectId").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Project Existance --'));
                const data = JSON.parse(response);

                for (let i = 0; i < data.length; i++) {
                    $("#continuedExistenceOfYourProjectId").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
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

function GetProvinces() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/provinces",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $("#ProvinceId").empty();
                //$("#ProvinceId").append($('<option  disabled="disabled"></option>').val('0').html('-- Select Province --'));
                const data = JSON.parse(response);
                for (let i = 0; i < data.length; i++) {
                    $
                    $("#ProvinceId").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
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


function GetProjectEffort() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/projectEffort",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $("IsProjectIndividualOrGroupEffort").empty();
                $("#IsProjectIndividualOrGroupEffort").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Project Effort --'));
                const data = JSON.parse(response);
                for (let i = 0; i < data.length; i++) {
                    $("#IsProjectIndividualOrGroupEffort").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
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

function GetProjectType() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/projecttype",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $("#CEProjectType").empty();
                $("#CEProjectType").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Project Type --'));
                const data = JSON.parse(response);
                for (let i = 0; i < data.length; i++) {
                    $("#CEProjectType").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
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

//function GetFaculties() {
//    $.ajax({
//        type: "POST",
//        url: config.serverPath + "Lookup/getfaculties",
//        headers: {
//            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
//        },
//        contentType: false,
//        processData: false,
//        success: function (response, textStatus, xhr) {
//            if (textStatus === "success" && xhr.status === 200) {
//                $("#facultyDivision").empty();
//                $("#SchoolId").empty();
//                $("#facultyDivision").append($('<option selected="selected" disabled="disabled" multiple></option>').val('0').html('-- Select Faculty --'));
//                $("#SchoolId").append($('<option selected="selected" disabled="disabled" multiple></option>').val('0').html('-- Select school --'));
//                const data = JSON.parse(response);
//                for (let i = 0; i < data.length; i++) {
//                    $("#facultyDivision").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
//                    $("#SchoolId").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
//                }
//            } else {
//                notify(response, 'alert alert-danger');
//            }
//        },
//        error: function (jqXhr, textStatus, errorThrown) {

//            notify(errorThrown, 'alert alert-danger');
//        }
//    });
//}

//function GetDepartments(facultyID) {

//    $.ajax({
//        type: "POST",
//        url: config.serverPath + "lookup/getdepartments/" + facultyID,
//        headers: {
//            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
//        },
//        contentType: false,
//        processData: false,
//        success: function (response, textStatus, xhr) {

//            if (textStatus === "success" && xhr.status === 200) {
//                $("#DepartmentUnit").empty();
//                $("#DepartmentResponsibleForProject").empty();
//                $("#DepartmentUnit").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Department --'));
//                $("#DepartmentResponsibleForProject").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Department Reponsible --'));
//                const data = JSON.parse(response);

//                for (let i = 0; i < data.length; i++) {
//                    $("#DepartmentUnit").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
//                    $("#DepartmentResponsibleForProject").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
//                }

//            } else {
//                notify(response, 'alert alert-danger');
//            }
//        },
//        error: function (jqXhr, textStatus, errorThrown) {

//            notify(errorThrown, 'alert alert-danger');
//        }
//    });
//}



function GetCommunityEngagementUnit() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/communityEngagementUnit",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $("#communityEngagementUnit").empty();
                $("#communityEngagementUnit").append($('<option selected="selected" disabled="disabled" multiple></option>').val('0').html('-- Select Institutional or Campus Project --'));
                const data = JSON.parse(response);
                for (let i = 0; i < data.length; i++) {
                    $("#communityEngagementUnit").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
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


function GetCampus() {
    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/campus",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $("#campus").empty();
                $("#campus").append($('<option selected="selected" disabled="disabled" multiple></option>').val('0').html('-- Select campus --'));
                const data = JSON.parse(response);
                for (let i = 0; i < data.length; i++) {
                    $("#campus").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
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

