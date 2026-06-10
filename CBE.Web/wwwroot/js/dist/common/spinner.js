//Global hook-up - show "please wait" when any ajax call is made in the application
$(document).ajaxStart(function () {
    $('#pleaseWaitDialog').modal();
});

$(document).ajaxStop(function () {
    $('#pleaseWaitDialog').modal('hide');
    $('body').removeClass('modal-open');
    $('body').css('padding-right', '0px');
    $('.modal-backdrop').remove();

    $("dvspinner").removeClass("loader loader-lg");
    let spinner = document.getElementById("dvspinner");
    spinner.style.visibility = 'visible'; //'hidden'
    spinner.style.display = "none";

});