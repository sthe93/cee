$(document).ready(function () {


    $.ajax({
        type: "POST",
        url: config.serverPath + "Lookup/sustainabledevelopmentgoals",
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        contentType: false,
        processData: false,
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $(".SustainableDevelopmentGoals").empty();
                $(".SustainableDevelopmentGoals").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('-- Select Sustainable Development Goals --'));
                $(".SustainableDevelopmentGoal").append($('<option selected="selected"></option>').val('0').html('-- Select Sustainable Development Goals --'));
                const data = JSON.parse(response);
                for (let i = 0; i < data.length; i++) {
                    $(".SustainableDevelopmentGoals").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
                    $(".SustainableDevelopmentGoal").append($('<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'));
                }
            } else {
                $.notify(response, 'alert alert-danger');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            notify(errorThrown, 'alert alert-danger');
        }
    });
});


