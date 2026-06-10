$(document).ready(function () {

    let navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {

        e.preventDefault();

        let $target = $($(this).attr('href')),
            $item = $(this);

        const currentUrl = window.location.href;

        if (currentUrl.includes("CreateProject")) {
            if (isProjectCreated() || $(this).attr('href') == "#step-1") {
                if (!$item.hasClass('disabled')) {
                    navListItems.removeClass('btn-success').addClass('btn-default');
                    $item.addClass('btn-success');
                    allWells.hide();
                    $target.show();
                    $target.find('input:eq(0)').focus();
                }
            } else {
                notify('Please create/save general project information.', 'alert alert-danger');
            }
        } else {
            if (!$item.hasClass('disabled')) {
                navListItems.removeClass('btn-success').addClass('btn-default');
                $item.addClass('btn-success');
                allWells.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
            }
        }

    });

    allNextBtn.click(function () {
        let curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");

        //for (let i = 0; i < curInputs.length; i++) {
        //    if (!curInputs[i].validity.valid) {
        //        isValid = false;
        //        $(curInputs[i]).closest(".form-group").addClass("has-error");
        //    }
        //}


        //for (let i of curInputs) {
        //    if (!curInputs[i].validity.valid) {
        //        isValid = false;
        //        $(curInputs[i]).closest(".form-group").addClass("has-error");
        //    }
        //}


        if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-success').trigger('click');
});

function isProjectCreated() {
    return $('#ProjectReference').val() !== '' && $('#ProjectReference').val() != null && $('#ProjectReference').val() != undefined;    
}

function btnNextStepper(curStepBtn) {

    nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a");
        isValid = true;

    if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
}