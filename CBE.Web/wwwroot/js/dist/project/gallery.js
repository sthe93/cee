$(document).ready(function () {

    if (document.getElementById("GeneralProjectId").value != "") {
        GetGallery();
    }

    $(document.body).on('click', '#btnGalleryConfig', function () {

        $("#newGalleryModalForm").modal("show");
    });

    $("#uploadImages").on("click", function () {
        document.getElementById("fileInput").click()
    });

  

    document.getElementById('fileInput').addEventListener('change', function (event) {
        const files = event.target.files;
        const images = [];
        let existingImagesCount = $("#dvgallery").find("[data-lightbox]").length;
        let isValidUpload = true;

        if ((existingImagesCount  + files.length) > 10) {
            notify("Maximum of 10 pictures allowed. " + (existingImagesCount != 0 ? `${existingImagesCount} already uploaded.` : ""), "alert alert-danger");
            event.preventDefault();
            event.stopImmediatePropagation();            
            return false;
        }

        if (checkDuplicatesUploads(files)) {          
            event.preventDefault();
            event.stopImmediatePropagation();
            return false;
        }
        

        for (const file of files) {

            if (!ValidateMultipleFileUploaded(file, file.name)) {
                isValidUpload = false;
                event.preventDefault();
                event.stopImmediatePropagation();
                break;
                return false;
            }          
        }
        if (isValidUpload) {
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    images.push(e.target.result);

                    $("#dvgallery").find("#uploadImages").before('<div><i class="fa fa-times closeIcon" title="delete" onclick="javascript:showDeleteModal(this)"></i><a  href="' + e.target.result + '"  data-lightbox="image-1" data-title="My caption 1"><img src="' + e.target.result + '" id="' + file.name +'"/></a></div>');
                };
                reader.readAsDataURL(file);               
            }
        }
    });

    $("#btnSaveGalleryChanges").on("click", saveNewImages);
});

function GetGallery() {


    $.ajax({
        type: "GET",
        url: config.serverPath + 'project/GetGallery',
        dataType: "json",
        data: null,
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {


                setTimeout(function () {

                    $.each(response, function (index) {
                        const lastIndex = decodeURIComponent(response[index]).lastIndexOf('/');
                        const resource = decodeURIComponent(response[index]).substring(lastIndex + 1);

                        if ($("#uploadImages").length) {
                            $("#dvgallery").find("#uploadImages").before('<div><i class="fa fa-times closeIcon" title="delete" onclick="javascript:showDeleteModal(this)"></i><a href="' + response[index] + '" data-lightbox="image-1" data-title="My caption 1"><img src="' + response[index] + '" id="'+resource+'"/></a></div>');

                        } else {
                            $("#dvgallery").append('<div><a href="' + response[index] + '" data-lightbox="image-1" data-title="My caption 1"><img src="' + response[index] + '" id="' + resource +'"/></a></div>');
                        }

                    });

                }, 200);               
            }
            else {
                // notify('Gallery: Internal Server Error', 'alert alert-danger');

            }
        },
        error: function (jqXhr, textStatus, errorThrown) {         
            // notify('Gallery: Internal Server Error', 'alert alert-danger');
        }
    });
}

function ValidateMultipleFileUploaded(file, FileNameType) {
    let _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
    if (file.type.startsWith("image")) {
        let sFileName = file.name;
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
                notify("Sorry, " + FileNameType + ", Only JPG, JPEG,PNG and GIF file types are allowed", 'alert alert-danger');               
                return false;
            }
        }
    } else {
        notify("Please upload image files only.", 'alert alert-danger');
        return false;
    }
    return true;
}

function saveNewImages() {
    let imageList = $("#dvgallery").find("[data-lightbox]");
    let imagesBytesObject = $.map(imageList, function (imageLink) {
        let $image = $($(imageLink).find("img"));

        if (!$image[0].src.startsWith("http")) {
            return {
                ImageName: $image[0].id,
                ImageByteString: $image[0].src,
                GeneralProjectId : 0
            }
        }
    });


    $.ajax({
        type: "POST",
        url: config.serverPath + "project/UploadGalleryImages",
        data: { GalleryImages: JSON.stringify( imagesBytesObject) },
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {

                notify(response.message, 'alert alert-success');
                document.location = config.serverPath + "dashboard/dashboard";
            }
            else {
                notify(response.message, 'alert alert-danger');
            }
        },
        error: function (response, textStatus, errorThrown) {
            notify(response.message, 'alert alert-danger');
        }
    });
}

function checkDuplicatesUploads(files) {
    let hasDuplicates = false;
    let existingImagesArray = $("#dvgallery").find("[data-lightbox]").children().map((i, x) => $(x).attr("id")).toArray();
    for (const file of files) {
        hasDuplicates = hasDuplicates || existingImagesArray.includes(file.name);
        if (existingImagesArray.includes(file.name)) {
            notify(`Image : "${file.name}" already added to the lists.`, "alert alert-danger");
        }
    }
    return hasDuplicates;
}

function deleteImage(imageName) {
    let formData = new FormData;
    formData.append("ImageName", imageName);
    formData.append("GeneralProjectId", 0);
    $.ajax({
        type: "POST",
        url: config.serverPath + "project/DeleteGalleryImage",
        contentType: false,
        processData: false,
        data: formData,
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                $(document.getElementById('fileInput')).val(null);
                document.getElementById('confirmModal').style.display = 'none';
                $(document.getElementById(imageName)).closest("div").remove();
                notify('Image deleted successfully.', 'alert alert-success');
            }
            else {
                notify('Failed to delete the image.', 'alert alert-danger');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            notify('Internal Server Error.', 'alert alert-danger');
        }
    });

}

function showDeleteModal(e) {
    let imageName = $(e).closest("div").find("img").attr("id");
    $("#selectedImageName").val(imageName);
    document.getElementById('confirmModal').style.display = 'block';
}

function confirmAction(isConfirmed) {
    let imageName = $("#selectedImageName").val();
    document.getElementById('confirmModal').style.display = 'none';

    if (isConfirmed) {        
        deleteImage(imageName);
    } else {       
        return false;
    }
}