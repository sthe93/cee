$(document).ready(function () {

    let j = 1;
    //added class to inputs projectProgress
    $('#btnProjectProgress').click(function () {


        $("#bdyProjectProgress").append('<tr><td><input name="ProjectProgress[' + j + '].Year" type="text" value=" ' + $('#numberofyearslist').val() +'" readonly class="form-control year" style="background-color: transparent!important; border: 0!important;"></td>' +
            '<td><input name="ProjectProgress[' + j + '].ProjectProgressName" type="textarea"  rows="5" cols="100" value="' + $('#projectProgress').val() +'" readonly class="form-control projectProgressName" style="background-color: transparent!important; border: 0!important;"></td>' +
            '<td class="text-center"><a class="btn btn-lg delete-staff" edu-data-id="1"><i class="la la-trash la-lg text-danger">Remove</i></a></td>' +

            '</tr>');


        $('#numberofyearslist').val("0")
        $('#projectProgress').val("");
        j++;
    });

    $('#bdyProjectProgress').on('click', '.delete-staff', function () {
        $(this).parent().parent().remove();
        j--; //decremnt count
        resetValues(); //call to reset values
    });

    function resetValues() {
        let counter = 1; //initialze to 1
        $("#bdyProjectProgress").each(function () {
            $(this).find('.year').attr("name", "projectProgress[" + counter + "].Year");
            $(this).find('.projectProgressName').attr("name", "projectProgress[" + counter + "].ProjectProgressName");
            counter++; //increment count
        })
    }



});