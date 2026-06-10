$(document).ready(function () {

    if (document.getElementById("GeneralProjectId").value != "0") {
        GetProjectOverview();   
    }

   

    $('#TargetSectorGroupOther').hide();

    $(document).on("change", "input[name='targetGroup']", function () {

        if (this.checked && this.value === "6") {
            $('#TargetSectorGroupOther').show();
        } else if (this.checked === false && this.value === "6") {
            $('#TargetSectorGroupOther').hide();
        }
    });

    $("#btnProjectOverview").click(function (e) {
        if (document.getElementById("ProjectDescription").value === "") {
            notify('Please enter project description', 'alert alert-danger');
            document.getElementById("ProjectDescription").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        //if (CountWords(document.getElementById("ProjectDescription").value) < 100) {
        //    notify('Project description must be more than 100 words', 'alert alert-danger');
        //    document.getElementById("ProjectDescription").focus();
        //    e.preventDefault();
        //    e.stopImmediatePropagation();
        //    return false;
        //}
        if (document.getElementById("ProblemWithProjectAddress").value === "") {
            notify('Please enter project solution', 'alert alert-danger');
            document.getElementById('ProblemWithProjectAddress').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        if (CountWords(document.getElementById("ProblemWithProjectAddress").value) > 150) {
            notify('Project solution must not be more than 150 words', 'alert alert-danger');
            document.getElementById("ProblemWithProjectAddress").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        if (document.getElementById("HowWhereThoseProblemsIdentified").value === "") {
            notify('Please enter how  where these problems identified?', 'alert alert-danger');
            document.getElementById('HowWhereThoseProblemsIdentified').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        if (CountWords(document.getElementById("HowWhereThoseProblemsIdentified").value) > 150) {
            notify('How were these problems identified? must not be more than 150 words', 'alert alert-danger');
            document.getElementById("HowWhereThoseProblemsIdentified").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        if (document.getElementById("ProjectObjectivesOutcomes").value === "") {
            notify('Please enter project objectives and outcomes', 'alert alert-danger');
            document.getElementById('ProjectObjectivesOutcomes').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        if (CountWords(document.getElementById("ProjectObjectivesOutcomes").value) > 150) {
            notify('Project objectives / outcomes must not be more than 150 words', 'alert alert-danger');
            document.getElementById("ProjectObjectivesOutcomes").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let targetGroupList = [];
        let otherId = "";
        $('input[name=targetGroup]').each(function () {
            if ($(this).is(":checked")) {
                if ($(this).val() !== "") {
                    otherId = $(this).val();
                    targetGroupList.push($(this).val());
                }
            }
        });

        if (targetGroupList.length == 0) {
            notify('Please select target group', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (otherId === "6") {
            if (document.getElementById("TargetSectorGroupOther").value === "") {

                notify('Please enter other target group', 'alert alert-danger');
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }

        if (document.getElementById("BenefitTargetGroup").value === "") {
            notify('Please enter how the project will benefit', 'alert alert-danger');
            document.getElementById('BenefitTargetGroup').focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        if (CountWords(document.getElementById("BenefitTargetGroup").value) > 150) {
            notify('Project benefit must not be more than 150 words', 'alert alert-danger');
            document.getElementById("BenefitTargetGroup").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }





        let formData = new FormData;
        e.preventDefault();
        formData.append("ProjectOverviewDescription", $("#ProjectDescription").val());
        formData.append("ProjectSolution", $("#ProblemWithProjectAddress").val());
        formData.append("ProblemsIdentification", $("#HowWhereThoseProblemsIdentified").val());
        formData.append("ProjectObjectivesOutcomes", $("#ProjectObjectivesOutcomes").val());
        formData.append("TargetGroupId", targetGroupList);
        formData.append("ProjectBenefits", $("#BenefitTargetGroup").val());
        formData.append("ProjectOverviewId", $("#ProjectOverviewId").val());
        formData.append("AdditionalFileExtension", $("#additionalInfoLink").attr("data-extension"));

        if (otherId === "6") {
            formData.append("OtherTargetGroup", $("#TargetSectorGroupOther").val());
        }

        let inputAdditionalInfo = document.getElementById("additionalInfo");
        let files = inputAdditionalInfo.files;

        if (files.length > 0) {
            if (!ValidateAdditionalFileUploaded(inputAdditionalInfo)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }

            for (let i = 0; i != files.length; i++) {
                formData.append("files", files[i]);
            }
        }
       

        $.ajax({
            type: "POST",
            url: config.serverPath + "project/createoverview",
            contentType: false,
            processData: false,
            data: formData,
            headers: {
                "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
            },
            success: function (response, textStatus, xhr) {
                if (textStatus === "success" && xhr.status === 200) {
                    notify('Project Overview created successfully', 'alert alert-success');
                    btnNextStepper("step-4");
                }
                else {
                    notify('Internal Server Erro', 'alert alert-danger');
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                notify(jqXhr.responseText, 'alert alert-danger');
            }
        });
    });

    $("#ProjectDescription").on("keyup", function () {
        ReCalculateProjectDescription();
    });

    document.getElementById('additionalInfoLink').addEventListener('click', function () {        
        previewContent(this); 
    });

    if ($("#additionalInfo").length > 0) {
        document.getElementById("additionalInfo").addEventListener('change', function (e) {
            let inputUpload = document.getElementById("additionalInfo");
            if (!ValidateAdditionalFileUploaded(inputUpload)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
            let files = inputUpload.files
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const index = (e.target.result).indexOf("base64,");
                    var byteStr = (e.target.result).substring(index + ("base64,").length).trim();
                    $('#additionalInfoLink').attr("src", byteStr);
                    $('#additionalInfoLink').html(file.name);
                    $('#additionalInfoLink').attr("data-extension", file.type);
                    showHideDeleteIcon();
                };
                reader.readAsDataURL(file);
            }          
        });
    }    

});

function ReCalculateProjectDescription() {
    const $textareaProjectDescription = $('#ProjectDescription');
    const $labelDescriptionWordCount = $('#labelDescriptionWordCount');
    const wordCount = $textareaProjectDescription.val() === '' ? 0 : $textareaProjectDescription.val().split(/\s+/).filter(word => word !== '').length;
    $labelDescriptionWordCount.html(wordCount);
}

function GetProjectOverview() {


    $.ajax({
        type: "GET",
        url: config.serverPath + 'project/GetProjectOverview',
        dataType: "json",
        data: null,
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {


                setTimeout(function () {
                    document.getElementById('ProjectDescription').value = response.projectOverviewDescription;
                    document.getElementById('ProblemWithProjectAddress').value = response.projectSolution;
                    document.getElementById('HowWhereThoseProblemsIdentified').value = response.problemsIdentification;
                    document.getElementById('ProjectObjectivesOutcomes').value = response.projectObjectivesOutcomes;
                    document.getElementById('BenefitTargetGroup').value = response.projectBenefits;
                    document.getElementById('ProjectOverviewId').value = response.projectOverviewId;
                    if (response.additionalFileName != null) {
                        $('#additionalInfoLink').removeAttr("disable");
                        $('#additionalInfoLink').attr("src", response.additionalFile);
                        $('#additionalInfoLink').html(response.additionalFileName);
                        $('#additionalInfoLink').attr("data-extension", response.additionalFileExtension);
                    } else {
                        $('#additionalInfoLink').attr("disabled","disabled").html("No File Attached."); 
                    }

                    const data = response.targetGroupId;
                    $.each(data, function (index) {

                        $("input[name='targetGroup']").each(function () {
                            if (this.value === data[index].toString()) {
                                this.checked = true;

                                if (data[index] == "6") {
                                    document.getElementById('TargetSectorGroupOther').value = response.otherTargetGroup;
                                    $('#TargetSectorGroupOther').show();
                                }
                            }
                        });

                    });

                    ReCalculateProjectDescription();
                    showHideDeleteIcon();
                }, 500);


            } else {
                notify('Project overview: Internal Server Error', 'alert alert-danger');

            }
        },
        error: function (jqXhr, textStatus, errorThrown) {

            notify('Project overview: Internal Server Error', 'alert alert-danger');
        }
    });
}

function previewContent() {
    var $fileLink = $("#additionalInfoLink");

    if ($fileLink.attr("data-extension") == "" || $fileLink.attr("data-extension") == undefined || $fileLink.attr("data-extension") == null) {
        return false;
    }

    document.getElementById('previewModal').style.display = 'block'; 
    
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = '';
    const fileType = $fileLink.attr("data-extension");

    if ($fileLink.html().endsWith('.pdf')) {  
        const byteCharacters = atob($fileLink.attr("src"));
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: fileType });
        const blobUrl = URL.createObjectURL(blob);
        $(previewContainer).css("margin", "0");

        const iframe = document.createElement('iframe');
        iframe.src = blobUrl;
        iframe.width = '100%';
        iframe.height = '100%';
        previewContainer.appendChild(iframe);        
    }
    else if ($fileLink.html().match(/\.(jpeg|jpg|gif|png)$/)) {        
        const byteCharacters = atob($fileLink.attr("src"));
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: fileType });
        const blobUrl = URL.createObjectURL(blob);
        $(previewContainer).css("margin", "auto");
        const img = document.createElement('img');
        img.src = blobUrl;
       
        Object.assign(img.style, { "max-width": "95%", "max-height": "90%" });
        previewContainer.appendChild(img);
    } else {
        previewContainer.innerHTML = 'Unsupported file type';
    }
}

function ValidateAdditionalFileUploaded(oInput) {
    let _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png", ".pdf"];
    if (oInput.type == "file") {
        let sFileName = oInput.value;
        if (sFileName.length > 0) {
            let blnValid = false;
            for (let j = 0; j < _validFileExtensions.length; j++) {
                let sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }

            if (!blnValid) {
                notify("Only JPEG,PNG,JPG and PDF file type allowed",'alert alert-danger');
                return false;
            }
        }
    }
    return true;
}

function closePreviewModal() {    
    document.getElementById('previewModal').style.display = 'none';
}

function showHideDeleteIcon() {
    if ($("#deleteIcon").length > 0) {
        if ($("#additionalInfoLink").attr("data-extension")) {
            $("#deleteIcon").show();
        } else {
            $("#deleteIcon").hide();
        }
    }
}

function deleteAttachedFile() {
    $(document.getElementById("additionalInfo")).val(null);
    $("#additionalInfoLink").removeAttr("data-extension").html("No File Attached.");
    showHideDeleteIcon();
  
}