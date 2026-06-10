$(document).ready(function () {


    let ModelFilter = new Object();
    getMyProjectDashboard(ModelFilter);

    $(".js-data-example-ajax").select2({
        placeholder: "-- Select Faculty/Division --",
        minimumInputLength: 3,
        ajax: {
            type: "POST",
            url: config.serverPath + "Lookup/FilterFacultiesDivision",
            headers: {
                "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
            },
            contentType: false,
            processData: false,          
            data: function (params) {
                var formdata = new FormData();
                formdata.append("search", params.term)
                return formdata;
            },
            processResults: function (data, params) {
                
                params.page = 1;
                let faculties = JSON.parse(data)
               let facultiesArray = faculties.map((x) => {

                    return { id: x.id, text: x.name };
                })
                return {                    
                    results: facultiesArray,
                    pagination: {
                        more: (params.page * 30) < data.total_count
                    }
                };
            },
            cache: true
        }
    });

    $(document).on("click", "#btnMyProjectDashboard", function () {
        ModelFilter = new Object();
        getMyProjectDashboard(ModelFilter);
    });

    $(document).on("click", "#btnMyDepartmentDashboard", function () {
        ModelFilter = new Object();
        getMyDepartmentDashboard(ModelFilter);
    })

    $(document).on("click", "#btnGlobalProjectDashboard", function () {
        ModelFilter = new Object();
        getGlobalDashboard(ModelFilter);
    })

    $(document.body).on('click', '.btnView', function () {
        let caneditprojects = $(this).attr("caneditprojects");

        let generalprojectid = $(this).attr('id');

        $.ajax({
            type: "POST",
            url: config.serverPath + "Dashboard/SetGeneralProject?GeneralProjectId=" + generalprojectid + "&CanEditProjects=" + caneditprojects,
            headers: {
                'RequestVerificationToken': '@TokenHeaderValue()'
            },
            success: function (response, textStatus, xhr) {
                if (textStatus === "success" && xhr.status == 200) {

                    window.location.href = config.serverPath + "project/EditProject";
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                notify('Please enter at least one student informattion', 'alert alert-danger');
            }
        });

    });


    $(document.body).on('click', '#btnMyProjectDashboardSearch', function () {


        let ModelFilter = new Object();
        ModelFilter.SDG = $(".myProj option:selected").val();
        ModelFilter.ProjectName = $("#ProjectName").val();
        ModelFilter.ProjectOwner = $("#ProjectOwner").val();
        ModelFilter.ReferenceNumber = $("#ReferenceNumber").val();
        getMyProjectDashboard(ModelFilter);

    });

    $(document.body).on('click', '#btnMyDeaprtmentDashboardSearch', function () {


        let ModelFilter = new Object();
        ModelFilter.SDG = $(".DepSDG option:selected").val();
        ModelFilter.ProjectName = $("#DepProjectName").val();
        ModelFilter.ProjectOwner = $("#DepProjectOwner").val();
        ModelFilter.ReferenceNumber = $("#DepReferenceNumber").val();
        getMyDepartmentDashboard(ModelFilter);
    });


    $(document.body).on('click', '#btnGlobalDashboardSearch', function () {


        let ModelFilter = new Object();
        ModelFilter.SDG = $(".GlobSDG option:selected").val();
        ModelFilter.ProjectName = $("#GlobProjectName").val();
        ModelFilter.ProjectOwner = $("#GlobProjectOwner").val();
        ModelFilter.ReferenceNumber = $("#GlobReferenceNumber").val();
        ModelFilter.FacultyDivision = $("#selectFacultyDevision option:selected").val();
        getGlobalDashboard(ModelFilter);
    });

});


function formatDateOnly(dateString) {
    if (!dateString || dateString === "null") return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function formatDateTime(dateString, includeTime = true) {
    if (!dateString) return "";
    
    const s = String(dateString).trim();
    if (!s || s.toLowerCase() === "null" || s.toLowerCase() === "undefined") return "";

    const normalized = s.replace(" ", "T");

    const date = new Date(normalized);

    if (Number.isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let formatted = `${day}/${month}/${year}`;

    if (includeTime) {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        formatted += ` ${hours}:${minutes}`;
    }

    return formatted;
}



function getMyProjectDashboard(searchObject) {
    console.log("");
    searchObject.CallingDashboard = 1;

    $("#bdyMyProjectDashboard").empty();
    $("#bdyMyProjectDashboard").append('<tr><td style="text-align:center" colspan="12"><i class="fa fa-2x fa-circle-o-notch fa-spin fa-fw"></i></td></tr>');
    $.ajax({
        type: "POST",
        url: config.serverPath + "Dashboard/Dashboard",
        headers: {
            'RequestVerificationToken': '@TokenHeaderValue()'
        },
        data: searchObject,
        success: function (response, textStatus, xhr) {


            $("#bdyMyProjectDashboard").empty();
            if (textStatus === "success" && xhr.status === 200) {


                if (response.length === 0) {
                    $("#bdyMyProjectDashboard").append("<tr><td style='text-align:center;vertical-align:middle' colspan='12'><strong>No record found.</strong></td></tr>");
                }

                const data = JSON.parse(response);
                $.each(data, function (index, item) {

                    let link = "<a class='btnView' CanEditProjects='NO' href='javascript:void(0)' id=" + item.GeneralProjectId + "><i class='mb-xs mt-xs mr-xs modal-sizes'></i> View</a>";
                    link += "<a class='btnView' CanEditProjects='YES' href='javascript:void(0)' id=" + item.GeneralProjectId + " class='mb-xs mt - xs mr - xs modal - sizes'><i class='fas fa-edit'></i> Edit</a>";

                    $("#bdyMyProjectDashboard").append(
                        "<tr><td>" + item.GeneralProjectId + "</td>" +
                        '<td>' + item.ProjectReference + '</td>' +
                        '<td>' + item.Title + '</td>' +
                        '<td>' + item.SustainableDevelopmentGoalDescription + '</td>' +
                        '<td>' + item.ProjectTypeName + '</td>' +
                        '<td>' + item.ProjectEffortName + '</td>' +
                        '<td>' + formatDateOnly(item.StartDate) + '</td>' +
                        '<td>' + formatDateOnly(((item.EndDate !== null && item.EndDate !== undefined && item.EndDate !== "null") ? item.EndDate : "")) + '</td>' +
                        '<td>' + formatDateTime(item.CreatedDate) + '</td>' +
                        '<td>' + item.CreatedBy + '</td>' +
                        '<td>' + item.CreatedUserRole + '</td>' +
                        '<td>' + link + '</td>' +
                        "</tr > ");
                });

            //    $('#MyProjectDashboardTable').DataTable();

                $('#bdyMyProjectDashboard').pageMe({
                    pagerSelector: '#historyPager',
                    activeColor: 'green',
                    prevText: 'Prev',
                    nextText: 'Next',
                    showPrevNext: true,
                    hidePageNumbers: false,
                    perPage: 10

                });
         

            } else {
                $("#bdyMyProjectDashboard").empty();
                $("#bdyMyProjectDashboard").append("<tr><td style='text-align:center;vertical-align:middle' colspan='12'><strong>No records to display.</strong></td></tr>");
                notify(response, 'alert alert-danger');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#bdyMyProjectDashboard").empty();
            $("#bdyMyProjectDashboard").append("<tr><td style='text-align:center;vertical-align:middle' colspan='12'><strong>No records to display.</strong></td></tr>");
            notify(errorThrown, 'alert alert-danger');

        }
    });
}





function getMyDepartmentDashboard(searchObject)
{
    searchObject.CallingDashboard = 2;
    let hfRoleId = $("#hfRoleId").val();
    $("#bdyDepartmentDashboard").empty();
    $("#bdyDepartmentDashboard").append('<tr><td style="text-align:center" colspan="12"><i class="fa fa-2x fa-circle-o-notch fa-spin fa-fw"></i></td></tr>');
    $.ajax({
        type: "POST",
        url: config.serverPath + "Dashboard/Dashboard",
        headers: {
            'RequestVerificationToken': '@TokenHeaderValue()'
        },
        data: searchObject,
        success: function (response, textStatus, xhr) {
            $("#bdyDepartmentDashboard").empty();

            if (textStatus === "success" && xhr.status === 200) {

                //  setTimeout(function () {
                if (response.length === 0 || response== '[]') {
                    $("#bdyDepartmentDashboard").append("<tr><td style='text-align:center;vertical-align:middle' colspan='12'><strong>No record found.</strong></td></tr>");
                }

                const data = JSON.parse(response);
                $.each(data, function (index, item) {

                    let link = "<a class='btnView' CanEditProjects='NO' href='javascript:void(0)' id=" + item.GeneralProjectId + "><i class='mb-xs mt-xs mr-xs modal-sizes'></i> View</a>";

                    if (hfRoleId == "Super Administrator" || hfRoleId == "Project Coordinator") {
                        link += "<a class='btnView' CanEditProjects='YES' href='javascript:void(0)' id=" + item.GeneralProjectId + " class='mb-xs mt - xs mr - xs modal - sizes'><i class='fas fa-edit'></i> Edit</a>";
                    }

                    $("#bdyDepartmentDashboard").append(
                        "<tr><td>" + item.GeneralProjectId + "</td>" +
                        '<td>' + item.ProjectReference + '</td>' +
                        '<td>' + item.Title + '</td>' +
                        '<td>' + item.SustainableDevelopmentGoalDescription + '</td>' +
                        '<td>' + item.ProjectTypeName + '</td>' +
                        '<td>' + item.ProjectEffortName + '</td>' +
                        '<td>' + formatDateOnly(item.StartDate) + '</td>' +
                        '<td>' + formatDateOnly(((item.EndDate !== null && item.EndDate !== undefined && item.EndDate !== "null") ? item.EndDate : "")) + '</td>' +
                        '<td>' + formatDateTime(item.CreatedDate) + '</td>' +
                        '<td>' + item.CreatedBy + '</td>' +
                        '<td>' + item.CreatedUserRole + '</td>' +
                        '<td>' + link + '</td>' +
                        "</tr > ");
                });




                $('#bdyDepartmentDashboard').pageMe({
                    pagerSelector: '#historyPager1',
                    activeColor: 'green',
                    prevText: 'Prev',
                    nextText: 'Next',
                    showPrevNext: true,
                    hidePageNumbers: false,
                    perPage: 10

                });

            } else {
                $("#bdyDepartmentDashboard").empty();
                $("#bdyDepartmentDashboard").append("<tr><td style='text-align:center;vertical-align:middle' colspan='12'><strong>No records to display.</strong></td></tr>");
                notify(response, 'alert alert-danger');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#bdyDepartmentDashboard").empty();
            $("#bdyDepartmentDashboard").append("<tr><td style='text-align:center;vertical-align:middle' colspan='12'><strong>No records to display.</strong></td></tr>");
            notify(errorThrown, 'alert alert-danger');

        }
    });
}





function getGlobalDashboard(searchObject) {
    searchObject.CallingDashboard = 3;
    $("#bdyGlobalDashboard").empty();
    $("#bdyGlobalDashboard").append('<tr><td style="text-align:center" colspan="12"><i class="fa fa-2x fa-circle-o-notch fa-spin fa-fw"></i></td></tr>');
    $.ajax({
        type: "POST",
        url: config.serverPath + "Dashboard/Dashboard",
        headers: {
            'RequestVerificationToken': '@TokenHeaderValue()'
        },
        data: searchObject,
        success: function (response, textStatus, xhr) {

            $("#bdyGlobalDashboard").empty();
            if (textStatus === "success" && xhr.status === 200) {

                //  setTimeout(function () {
                if (response.length === 0) {
                    $("#bdyGlobalDashboard").append("<tr><td style='text-align:center;vertical-align:middle' colspan='12'><strong>No record found.</strong></td></tr>");
                }

                const data = JSON.parse(response);
                $.each(data, function (index, item) {

                    let link = "<a class='btnView' CanEditProjects='NO' href='javascript:void(0)' id=" + item.GeneralProjectId + "><i class='mb-xs mt-xs mr-xs modal-sizes'></i> View</a>";
                    link += "<a class='btnView' CanEditProjects='YES' href='javascript:void(0)' id=" + item.GeneralProjectId + " class='mb-xs mt - xs mr - xs modal - sizes'><i class='fas fa-edit'></i> Edit</a>";

                    $("#bdyGlobalDashboard").append(
                        "<tr><td>" + item.GeneralProjectId + "</td>" +
                        '<td>' + item.ProjectReference + '</td>' +
                        '<td>' + item.Title + '</td>' +
                        '<td>' + item.SustainableDevelopmentGoalDescription + '</td>' +
                        '<td>' + item.ProjectTypeName + '</td>' +
                        '<td>' + item.ProjectEffortName + '</td>' +
                        '<td>' + formatDateOnly(item.StartDate) + '</td>' +
                        '<td>' + formatDateOnly(((item.EndDate !== null && item.EndDate !== undefined && item.EndDate !== "null") ? item.EndDate : "")) + '</td>' +
                        '<td>' + formatDateTime(item.CreatedDate) + '</td>' +
                        '<td>' + item.CreatedBy + '</td>' +
                        '<td>' + item.CreatedUserRole + '</td>' +
                        '<td>' + link + '</td>' +
                        "</tr > ");
                });

                $('#bdyGlobalDashboard').pageMe({
                    pagerSelector: '#historyPager2',
                    activeColor: 'green',
                    prevText: 'Prev',
                    nextText: 'Next',
                    showPrevNext: true,
                    hidePageNumbers: false,
                    perPage: 10

                });
                //  }, 80);

            } else {
                $("#bdyGlobalDashboard").empty();
                $("#bdyGlobalDashboard").append("<tr><td style='text-align:center;vertical-align:middle' colspan='12'><strong>No records to display.</strong></td></tr>");
                notify(response, 'alert alert-danger');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#bdyGlobalDashboard").empty();
            $("#bdyGlobalDashboard").append("<tr><td style='text-align:center;vertical-align:middle' colspan='12'><strong>No records to display.</strong></td></tr>");
            notify(errorThrown, 'alert alert-danger');

        }
    });
}
