const PROJECT_DURATION_ONCE_OFF = "1";
const PROJECT_DURATION_ONGOING = "2";

$(document).ready(function () {

    $('.btnProjectProgressModal').hide();

    document.getElementById("NoOfhoursPerStaffVolunteer").readOnly = $("#NoOfhoursPerStaffVolunteer").val() == "" || $("#NoOfhoursPerStaffVolunteer").val() == 0 ? true : false;
    document.getElementById("NoOfhoursPertudentVolunteer").readOnly = $("#NoOfhoursPertudentVolunteer").val() == "" || $("#NoOfhoursPertudentVolunteer").val() == 0 ? true : false;

    //console.log(document.getElementById("GeneralProjectId").value);

    if (document.getElementById("GeneralProjectId").value != "0") {
        GetProjectDetails();
    }

    if (document.getElementById("roleName").value != "Super Administrator") {
        GetDepartments(document.getElementById("hdFacultyId").value);
    }


    $(document).on("change", "input[name='flagshipProject']", function () {

        GetFlagshipExist(this.value);
    });

    $(document.body).on('click', '.btnProjectProgressModal', function () {
        $("#newProjectProgressModalForm").modal({
            backdrop: 'static',
            keyboard: false,
            show: true // added property here
        });

        let number = document.getElementById("numberofyears").value;
        $("#numberofyearslist").empty();

        $("#numberofyearslist").append($('<option selected="selected" disabled="disabled"></option>').val('0').html('Select year'));
        for (let i = 1; i <= number; i++) {
            if (i == 1) {
                $("#numberofyearslist").append($('<option value=' + i + '>' + i + ' year' + '</option>'));
            } else {
                $("#numberofyearslist").append($('<option value=' + i + '>' + i + ' years' + '</option>'));

            }
        }
    });

    $(document.body).on('click', '.CancelModal', function () {
        $('#newProjectProgressModalForm').hide();
        $('#newProjectProgressModalForm').modal('hide');
        $('body').removeClass('modal-open');
        $('body').css('padding-right', '0px');
        $('.modal-backdrop').remove();
    });

    let displayimage = document.getElementById("display-image");
    displayimage.style.display = "none";

    $(document.body).on('keyup', '#numberofyears', function (e) {

        let number = document.getElementById("numberofyears").value;
        if (number == "") {
            notify('Please enter valid number of years', 'alert alert-danger');
            $('#numberofyears').val('');
            document.getElementById("numberofyears").focus();
            $('.btnProjectProgressModal').hide();
        }
        else if (number > 0) {
            $('.btnProjectProgressModal').show();
        } else {
            notify('Number of years must be more than 0.', 'alert alert-danger');
            $('#numberofyears').val('');
            document.getElementById("numberofyears").focus();
            $('.btnProjectProgressModal').hide();
        }
    });

    $(document.body).on('keyup', '#NoOfhoursPerStaffVolunteer', function (e) {

        if (isNaN(document.getElementById("NoOfhoursPerStaffVolunteer").value)) {
            notify('Please valid number of hours for staff volunteer', 'alert alert-danger');
            document.getElementById("NoOfhoursPerStaffVolunteer").value = "";
        }

        let number = document.getElementById("NoOfhoursPerStaffVolunteer").value;
        if (number == "") {
            notify('Please enter valid number of hours per staff', 'alert alert-danger');
            $('#NoOfhoursPerStaffVolunteer').val('');
            document.getElementById("NoOfhoursPerStaffVolunteer").focus();

        }
        else if (number.length > 4) {
            notify('Number of hours per staff must be between 1 to 4 digits', 'alert alert-danger');
            $('#NoOfhoursPerStaffVolunteer').val('');
            document.getElementById("NoOfhoursPerStaffVolunteer").focus();

        }
    });

    $(document.body).on('keyup', '#NumberOfUJStaffInvolved', function (e) {

        if (isNaN(document.getElementById("NumberOfUJStaffInvolved").value)) {
            notify('Please valid number of hours for staff involved', 'alert alert-danger');
            document.getElementById("NumberOfUJStaffInvolved").value = "";
        }

        let number = document.getElementById("NumberOfUJStaffInvolved").value;
        if (number == "" || number == 0) {
            document.getElementById("NoOfhoursPerStaffVolunteer").value = "";
            document.getElementById("NoOfhoursPerStaffVolunteer").readOnly = true;
            $($($("#NoOfhoursPerStaffVolunteer").parent().siblings('label')[0]).find('span')).removeAttr('hidden').attr('hidden', 'hidden');
        }
        else {
            document.getElementById("NoOfhoursPerStaffVolunteer").readOnly = false;
            $($($("#NoOfhoursPerStaffVolunteer").parent().siblings('label')[0]).find('span')).removeAttr('hidden');
        }
    });

    $(document.body).on('keyup', '#NumberOfUJStudentInvolved', function (e) {
        if (isNaN(document.getElementById("NumberOfUJStudentInvolved").value)) {
            notify('Please valid number of hours for student', 'alert alert-danger');
            document.getElementById("NumberOfUJStudentInvolved").value = "";
        }

        let number = document.getElementById("NumberOfUJStudentInvolved").value;
        if (number == "" || number == 0) {
            document.getElementById("NoOfhoursPertudentVolunteer").value = "";
            document.getElementById("NoOfhoursPertudentVolunteer").readOnly = true;
            $($($("#NoOfhoursPertudentVolunteer").parent().siblings('label')[1]).find('span')).removeAttr('hidden').attr('hidden', 'hidden');
        }
        else {
            document.getElementById("NoOfhoursPertudentVolunteer").readOnly = false;
            $($($("#NoOfhoursPertudentVolunteer").parent().siblings('label')[1]).find('span')).removeAttr('hidden');
        }
    });

    $(document.body).on('keyup', '#NoOfhoursPertudentVolunteer', function (e) {

        if (isNaN(document.getElementById("NoOfhoursPertudentVolunteer").value)) {
            notify('Please valid number of hours for student volunteer', 'alert alert-danger');
            document.getElementById("NoOfhoursPertudentVolunteer").value = "";
        }

        let number = document.getElementById("NoOfhoursPertudentVolunteer").value;
        if (number == "") {
            notify('Please enter valid number of hours per student', 'alert alert-danger');
            $('#NoOfhoursPertudentVolunteer').val('');
            document.getElementById("NoOfhoursPertudentVolunteer").focus();

        }

        else if (number.length > 4) {

            notify('Number of hours per student must be between 1 to 4 digits', 'alert alert-danger');
            $('#NoOfhoursPertudentVolunteer').val('');
            document.getElementById("NoOfhoursPertudentVolunteer").focus();
        }


    });

    $(document.body).on('keyup', '.totaVolunteerHoursStaff', function (e) {

        let numberOfUJStaffInvolved = document.getElementById("NumberOfUJStaffInvolved").value;
        let numberOfhoursPerStaffVolunteer = document.getElementById("NoOfhoursPerStaffVolunteer").value;
        let totalvolunteerhoursStudent = document.getElementById("totalvolunteerhoursStudent").value;


        if (numberOfUJStaffInvolved == "") {
            numberOfUJStaffInvolved = 0
        }

        if (numberOfhoursPerStaffVolunteer == "") {
            numberOfhoursPerStaffVolunteer = 0
        }

        let total = parseFloat(numberOfUJStaffInvolved) * parseFloat(numberOfhoursPerStaffVolunteer);

        document.getElementById("totalvolunteerhoursStaff").value = total;


        if (totalvolunteerhoursStudent == "") {
            totalvolunteerhoursStudent = 0
        }


        document.getElementById("grandTotalVolunteerHhours").value = parseFloat(totalvolunteerhoursStudent) + parseFloat(total);
    });

    $(document.body).on('keyup', '.totalvolunteerhoursStudent', function (e) {


        let numberOfUJStudentInvolved = document.getElementById("NumberOfUJStudentInvolved").value;
        let numberOfhoursPertudentVolunteer = document.getElementById("NoOfhoursPertudentVolunteer").value;
        let totalvolunteerhoursStaff = document.getElementById("totalvolunteerhoursStaff").value;

        if (numberOfUJStudentInvolved == "") {
            numberOfUJStudentInvolved = 0
        }

        if (numberOfhoursPertudentVolunteer == "") {
            numberOfhoursPertudentVolunteer = 0
        }

        let total = parseFloat(numberOfUJStudentInvolved) * parseFloat(numberOfhoursPertudentVolunteer);

        document.getElementById("totalvolunteerhoursStudent").value = total;


        if (totalvolunteerhoursStaff == "") {
            totalvolunteerhoursStaff = 0
        }
        document.getElementById("grandTotalVolunteerHhours").value = parseFloat(total) + parseFloat(totalvolunteerhoursStaff);

    });

    $(document.body).on('keyup', '#bdyNumberOfUJStudentInvolved', function (e) {

    });

    $(document.body).on('click', '#btntGeneralProject', function (e) {
        //let projectlogo = document.getElementById("CBEProjectLogo").getAttribute("src");
        //if (projectlogo === "") {

        //    notify('Please upload project logo', 'alert alert-danger');
        //    e.preventDefault();
        //    e.stopImmediatePropagation();
        //    return false;
        //}
        let inputO = document.getElementById("fileUpload1");
        if (!ValidateFileUploaded(inputO, "Project Logo")) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (document.getElementById("titleOftheProject").value === "") {

            notify('Please enter project title', 'alert alert-danger');
            document.getElementById("titleOftheProject").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (Count_Characters(document.getElementById("titleOftheProject").value) > 100) {

            notify('Project title characters must not be more than 100', 'alert alert-danger');
            document.getElementById("OtherMajorPartiesInvolved").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let facultyDivisionValue = $("#facultyDivision option:selected").val();
        if (facultyDivisionValue === undefined || facultyDivisionValue === "0" || facultyDivisionValue === "" || facultyDivisionValue === null) {

            notify('Please select faculty', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let DepartmentValue = $("#DepartmentUnit option:selected").val();
        if (DepartmentValue === undefined || DepartmentValue === "0" || DepartmentValue === "" || DepartmentValue === null) {

            notify('Please select department', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let departmentResponsibleValue = $("#DepartmentResponsibleForProject option:selected").val();
        if (departmentResponsibleValue === undefined || departmentResponsibleValue === "0" || departmentResponsibleValue === "" || departmentResponsibleValue === null) {

            notify('Please select department responsible for the project', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let communityEngagementUnit = $("#communityEngagementUnit option:selected").val();
        if (communityEngagementUnit === undefined || communityEngagementUnit === "0" || communityEngagementUnit === "" || communityEngagementUnit === null) {

            notify('Please select community engagement unit', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (communityEngagementUnit == 2) {
            let campus = $("#campus option:selected").val();
            if (campus === undefined || campus === "0" || campus === "" || campus === null) {

                notify('Please select campus', 'alert alert-danger');
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }


        let projectDurationValue = $("#ProjectDuration option:selected").val();

        if (projectDurationValue === undefined || projectDurationValue === "0" || projectDurationValue === "" || projectDurationValue === null)
        {

            notify('Please select project duration', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }




        let goalValue = $("#SustainableDevelopmentGoals option:selected").val();
        if (goalValue === undefined || goalValue === "0" || goalValue === "" || goalValue === null) {

            notify('Please select sustainable development goals', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let projectValue = $("#CEProjectType option:selected").val();
        if (projectValue === undefined || projectValue === "0" || projectValue === "" || projectValue === null) {

            notify('Please select project type', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (document.getElementById("ProjectStartDate").value === "" || document.getElementById("ProjectStartDate").value === "yyyy-mm-dd") {

            notify('Please select start date', 'alert alert-danger');
            document.getElementById("ProjectStartDate").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (projectDurationValue == PROJECT_DURATION_ONCE_OFF)
        {
            if (document.getElementById("ProjectEndDate").value === "" || document.getElementById("ProjectStartDate").value === "yyyy-mm-dd") {

                notify('Please select an End Date.', 'alert alert-danger');
                document.getElementById("ProjectEndDate").focus();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }

        if (projectDurationValue == PROJECT_DURATION_ONCE_OFF) {
            if ((document.getElementById("ProjectStartDate").value > document.getElementById("ProjectEndDate").value)) {

                notify('Project End Date can not be less than the Start Date required', 'alert alert-danger');
                document.getElementById("ProjectEndDate").focus();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }

        if (document.getElementById("ProjectActualLocationName").value === "") {

            notify('Please enter project address', 'alert alert-danger');
            document.getElementById("ProjectActualLocationName").focus();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let projectLocationValue = $("#ProjectLocation option:selected").val();
        if (projectLocationValue === undefined || projectLocationValue === "0" || projectLocationValue === "" || projectLocationValue === null) {

            notify('Please select project location', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        let projectEffortValue = $("#IsProjectIndividualOrGroupEffort option:selected").val();
        if (projectEffortValue === undefined || projectEffortValue === "0" || projectEffortValue === "" || projectEffortValue === null) {

            notify('Please select project effort', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        // Enhanced student validation
        const studentCountInTable = $("#bdyNumberOfUJStudentInvolved tr").length;
        const numberOfUJStudentInvolved = $("#NumberOfUJStudentInvolved").val();

        // Validate the number of students field
        if (numberOfUJStudentInvolved === "" || isNaN(numberOfUJStudentInvolved) || parseInt(numberOfUJStudentInvolved) < 0) {
            notify('Number of students is required and must be a valid positive number', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        const enteredStudentCount = parseInt(numberOfUJStudentInvolved);

        if (studentCountInTable > 0 && enteredStudentCount === 0) {
            notify('You have added students but entered 0. Please remove the students or enter the correct number of students.', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        // Case 1: If there are students in table, the count must match exactly
        if (studentCountInTable > 0) {
            if (enteredStudentCount !== studentCountInTable) {
                notify(`Number of students added  must exactly match the number entered `, 'alert alert-danger');
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }
        // Case 2: If no students in table but number is > 0
        else if (enteredStudentCount > 0) {
            notify('Please add the students you specified', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        // Validate student data if any students exist
        if (studentCountInTable > 0) {
            let studentNumbers = new Set();
            let hasErrors = false;

            $("#bdyNumberOfUJStudentInvolved tr").each(function () {
                const studentNumber = $(this).find('input[type="hidden"]').val();
                const name = $(this).find('.name').val();
                const telephone = $(this).find('.telephone').val();

                if (studentNumbers.has(studentNumber)) {
                    notify(`Duplicate student number: ${studentNumber}`, 'alert alert-danger');
                    hasErrors = true;
                    return false; // breaks the each loop
                }
                studentNumbers.add(studentNumber);

                if (telephone && !/^\d{10}$/.test(telephone)) {
                    notify(`Invalid telephone number for student ${studentNumber} - must be 10 digits`, 'alert alert-danger');
                    hasErrors = true;
                    return false;
                }

                if (!name || name.trim() === "") {
                    notify(`Missing name for student ${studentNumber}`, 'alert alert-danger');
                    hasErrors = true;
                    return false;
                }
            });

            if (hasErrors) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }
        let IsProjectIndividualOrGroupEffortValue = $("#IsProjectIndividualOrGroupEffort option:selected").val();

        if (IsProjectIndividualOrGroupEffortValue == 2) {

            if (document.getElementById("NumberOfUJStaffInvolved").value == "") {
                notify('Number of UJ staff is required.', 'alert alert-danger');
                document.getElementById("NumberOfUJStaffInvolved").focus();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }

            if (document.getElementById("NumberOfUJStaffInvolved").value != "") {

                if (isNaN(document.getElementById("NumberOfUJStaffInvolved").value)) {

                    notify('Please enter number of UJ staff involved', 'alert alert-danger');
                    document.getElementById("NumberOfUJStaffInvolved").focus();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }

                let xNumber = document.getElementById("NumberOfUJStaffInvolved").value;
                if (xNumber <= 0) {

                    notify('Number of UJ staff must not be less than or equal to 0.', 'alert alert-danger');
                    document.getElementById("NumberOfUJStaffInvolved").focus();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }
            }


            if (document.getElementById("NumberOfUJStudentInvolved").value != "") {

                if (isNaN(document.getElementById("NumberOfUJStudentInvolved").value)) {

                    notify('Please enter a valid number of UJ students involved', 'alert alert-danger');

                    document.getElementById("NumberOfUJStudentInvolved").focus();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }

                //some projects does not include students

                //let yNumber = document.getElementById("NumberOfUJStudentInvolved").value;
                //if (yNumber <= 0) {

                //    notify('Number of UJ students must not be less than or equal to 0.', 'alert alert-danger');
                //    document.getElementById("NumberOfUJStudentInvolve").focus();
                //    e.preventDefault();
                //    e.stopImmediatePropagation();
                //    return false;
                //}
            }

            if (document.getElementById("NumberOfUJStaffInvolved").value != "") {

                if (isNaN(document.getElementById("NoOfhoursPerStaffVolunteer").value)) {

                    notify('Please enter a valid number of hours for staff volunteers involved', 'alert alert-danger');

                    document.getElementById("NoOfhoursPerStaffVolunteer").focus();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }

                let xxNumber = document.getElementById("NoOfhoursPerStaffVolunteer").value;
                if (xxNumber <= 0) {

                    notify('Number of hours for staff volunteer must not be less than or equal to 0.', 'alert alert-danger');
                    document.getElementById("NoOfhoursPerStaffVolunteer").focus();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }
            }

            if (document.getElementById("NumberOfUJStudentInvolved").value != "") {

                if (isNaN(document.getElementById("NoOfhoursPertudentVolunteer").value)) {

                    notify('Please enter a valid number of hours student volunteers involved', 'alert alert-danger');

                    document.getElementById("NoOfhoursPertudentVolunteer").focus();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false
                }


                let yyNumber = document.getElementById("NoOfhoursPertudentVolunteer").value;
                if (yyNumber < 0) {

                    notify('Number of hours for students volunteer must not be less than 0.', 'alert alert-danger');
                    document.getElementById("NoOfhoursPertudentVolunteer").focus();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }
            }
        }







        let numberofyears = document.getElementById("numberofyears").value;
        if (projectDurationValue === PROJECT_DURATION_ONGOING) {

            if (isNaN(document.getElementById("numberofyears").value)) {

                notify('Please enter Number of years', 'alert alert-danger');

                document.getElementById("numberofyears").focus();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }


            if (numberofyears <= 0) {

                notify('Please enter Number of years.', 'alert alert-danger');
                document.getElementById("numberofyears").focus();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }

        let flagshipProject = "";
        let isFlagshipProject = "";
        $('input[name=flagshipProject]').each(function () {
            if ($(this).is(":checked")) {
                if ($(this).val() == "Yes") {
                    isFlagshipProject = true;
                    flagshipProject = $(this).val();
                }
                else {
                    isFlagshipProject = false;
                    flagshipProject = $(this).val();
                }
            }
        });

        if (flagshipProject == "") {
            notify('Please specify flagship status', 'alert alert-danger');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }


        normalizeProjectDurationFields(projectDurationValue);
        numberofyears = document.getElementById("numberofyears").value;

        let formData = new FormData;
        e.preventDefault();


        let input = document.getElementById("fileUpload1");
        let files = input.files;

        for (let i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
        }

        if (projectDurationValue === PROJECT_DURATION_ONGOING && numberofyears > 0) {
            $("#bdyProjectProgress").each(function () {

                let $rows = $(this).find('tr'); // Get all rows within the tbody

                // Iterate over each row
                $rows.each(function (index) {

                    let progress = $(this).find('.projectProgressName').attr("name", "ProjectProgress[" + index + "].Name");
                    let year = $(this).find('.year').attr("name", "ProjectProgress[" + index + "].Year");
                    let projectProgressId = $(this).find('.projectProgressId').attr("name", "ProjectProgress[" + index + "].ProjectProgressId");
                    let generalProjectId = $(this).find('.generalProjectId').attr("name", "ProjectProgress[" + index + "].GeneralProjectId");

                    formData.append('ProjectProgresses[' + index + '].ProjectProgressName', progress.val());
                    formData.append('ProjectProgresses[' + index + '].Year', year.val());
                    formData.append('ProjectProgresses[' + index + '].ProjectProgressId', projectProgressId.val());
                    formData.append('ProjectProgresses[' + index + '].GeneralProjectId', generalProjectId.val());
                });
            })
        }

        let ProjectVolunteerList = []
        let error = "";

        $("#bdyNumberOfUJStaffInvolved").each(function () {

            let $rows = $(this).find('tr'); // Get all rows within the tbody
            // Iterate over each row
            $rows.each(function (index) {

                let name = $(this).find('.name').attr("name", "Staff[" + index + "].Name");
                let telephone = $(this).find('.telephone').attr("name", "Staff[" + index + "].Telephone");
                let projectVolunteerDetailsId = $(this).find('.projectVolunteerDetailsId').attr("name", "Staff[" + index + "].ProjectVolunteerDetailsId");
                let generalProjectId = $(this).find('.generalProjectId').attr("name", "Staff[" + index + "].GeneralProjectId");

                if (name.val() == "") {
                    error = "Please enter name for the staff";
                    return false;
                }

                if (telephone.val() == "") {
                    error = "Please enter correct telephone number for staff";
                    return false;
                }

                if (Count_Characters(telephone.val()) != 10) {
                    error = "Please enter correct telephone number for staff";
                    return false;
                }

                let ProjectVolunteerDetails = {
                    "Name": name.val(),
                    "ContactNumber": telephone.val(),
                    "Type": "Staff",
                    "ProjectVolunteerDetailsId": projectVolunteerDetailsId.val(),
                    "GeneralProjectId": generalProjectId.val()
                }
                ProjectVolunteerList.push(ProjectVolunteerDetails);
            });
        })

        if (error != "") {
            notify(error, 'alert alert-danger');
            return false;
        }

        $("#bdyNumberOfUJStudentInvolved").each(function () {

            let $rows = $(this).find('tr'); // Get all rows within the tbody

            // Iterate over each row
            $rows.each(function (index) {

                let name = $(this).find('.name').attr("name", "Student[" + index + "].Name");
                let telephone = $(this).find('.telephone').attr("name", "Student[" + index + "].Telephone");
                let projectVolunteerDetailsId = $(this).find('.projectVolunteerDetailsId').attr("name", "Student[" + index + "].ProjectVolunteerDetailsId");
                let generalProjectId = $(this).find('.generalProjectId').attr("name", "Student[" + index + "].GeneralProjectId");

                if (name.val() == "") {
                    error = "Please enter name for the student";
                    return false;
                }

                if (telephone.val() == "") {
                    error = " Please enter correct telephone number for student";
                    return false;
                }

                if (Count_Characters(telephone.val()) != 10) {
                    error = " Please enter correct telephone number for student";
                    return false;
                }

                let ProjectVolunteerDetails = {
                    "Name": name.val(),
                    "ContactNumber": telephone.val(),
                    "Type": "Student",
                    "ProjectVolunteerDetailsId": projectVolunteerDetailsId.val(),
                    "GeneralProjectId": generalProjectId.val()
                }
                ProjectVolunteerList.push(ProjectVolunteerDetails);
            });
        })


        if (error != "") {
            notify(error, 'alert alert-danger');
            return false;
        }

        const staff = ProjectVolunteerList.find((tpe) => tpe.Type == "Staff");
        const student = ProjectVolunteerList.find((tpe) => tpe.Type == "Student");


        if ($("#NumberOfUJStaffInvolved").val() > 0 && $("#IsProjectIndividualOrGroupEffort option:selected").val() != "1") {
            if (staff == undefined) {
                notify('Please enter at least one staff informattion', 'alert alert-danger');
                return false;
            }
        }
        if ($("#NumberOfUJStudentInvolved").val() > 0 && $("#IsProjectIndividualOrGroupEffort option:selected").val() != "1") {
            if (student == undefined) {
                notify('Please enter at least one student informattion', 'alert alert-danger');
                return false;
            }
        }

        for (let i = 0; i < ProjectVolunteerList.length; i++) {
            formData.append('ProjectVolunteerDetails[' + i + '].Name', ProjectVolunteerList[i].Name);
            formData.append('ProjectVolunteerDetails[' + i + '].ContactNumber', ProjectVolunteerList[i].ContactNumber);
            formData.append('ProjectVolunteerDetails[' + i + '].Type', ProjectVolunteerList[i].Type);
            formData.append('ProjectVolunteerDetails[' + i + '].ProjectVolunteerDetailsId', ProjectVolunteerList[i].ProjectVolunteerDetailsId);
            formData.append('ProjectVolunteerDetails[' + i + '].GeneralProjectId', ProjectVolunteerList[i].GeneralProjectId);
        }



        formData.append("ProjectReference", $("#ProjectReference").val());
        formData.append("FacultyId", $("#facultyDivision option:selected").val());
        formData.append("ProjectReference", $("#projectReference").val());
        formData.append("DepartmentId", $("#DepartmentUnit option:selected").val());
        formData.append("Title", $("#titleOftheProject").val());
        formData.append("ProjectDurationId", $("#ProjectDuration option:selected").val());
        formData.append("SustainableDevelopmentGoalId", $("#SustainableDevelopmentGoals option:selected").val());
        formData.append("ProjectAddress", $("#ProjectActualLocationName").val());
        formData.append("StartDate", $("#ProjectStartDate").val());
        if (projectDurationValue === PROJECT_DURATION_ONCE_OFF) {
            formData.append("EndDate", $("#ProjectEndDate").val());
        }
        formData.append("ProjectTypeId", $("#CEProjectType option:selected").val());
        formData.append("LocationScopeId", $("#ProjectLocation option:selected").val());
        formData.append("ProjectEffortId", $("#IsProjectIndividualOrGroupEffort option:selected").val());
        formData.append("DepartmentResponsibleId", $("#DepartmentResponsibleForProject option:selected").val());

        formData.append("NumberOfUJStaffInvolved", $("#NumberOfUJStaffInvolved").val());
        formData.append("NumberOfUjstudentInvolved", $("#NumberOfUJStudentInvolved").val());

        formData.append("CommunityEngagementUnitId", $("#communityEngagementUnit option:selected").val());
        formData.append("NumberOfVolunteerHoursStaff", $("#NoOfhoursPerStaffVolunteer").val());
        formData.append("NumberOfVolunteerHoursStudent", $("#NoOfhoursPertudentVolunteer").val());
        formData.append("NumberOfYears", projectDurationValue === PROJECT_DURATION_ONGOING ? $("#numberofyears").val() : "");
        formData.append("IsFlagship", isFlagshipProject);
        formData.append("CampusId", $("#campus option:selected").val());

        $.ajax({
            type: "POST",
            url: config.serverPath + "Project/GeneralProject",
            contentType: false,
            processData: false,
            data: formData,
            headers: {
                "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
            },
            success: function (response, textStatus, xhr) {
                if (textStatus === "success" && xhr.status === 200) {
                    GetProjectDetails();
                    notify('Project general: information created successfully', 'alert alert-success');
                    $('#ProjectReference').val("PROJ/000/000");
                    btnNextStepper("step-1");

                }
                else {
                    notify('Genral information: Internal Server Error', 'alert alert-danger');
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                notify(jqXhr.responseText, 'alert alert-danger');
            }
        });
    });
});



function onProjectEffortChange(e) {
    if ($("#IsProjectIndividualOrGroupEffort option:selected").val() == 1) {
        $("#NumberOfUJStaffInvolved").val(0);
        $("#NumberOfUJStudentInvolved").val(0);
        $('.dvProjectEffort').hide();
    }
    else {
        $('.dvProjectEffort').show();
    }
}

function onProjectDurationChange(e) {
    let projectDurationValue = $("#ProjectDuration option:selected").val();

    if (projectDurationValue === PROJECT_DURATION_ONCE_OFF) {
        $('.dvNumberofyears').hide();
        $('.ToggleProjectEndDate').show();
    }
    else {
        $('.dvNumberofyears').show();
        $('.ToggleProjectEndDate').hide();
    }

    normalizeProjectDurationFields(projectDurationValue);
}

function normalizeProjectDurationFields(projectDurationValue) {
    if (projectDurationValue === PROJECT_DURATION_ONCE_OFF) {
        document.getElementById("numberofyears").value = "";
        $("#bdyProjectProgress").empty();
        $('.btnProjectProgressModal').hide();
    }
    else if (projectDurationValue === PROJECT_DURATION_ONGOING) {
        document.getElementById("ProjectEndDate").value = "";
    }
}

function onCommunityEngagementUnitChange(e) {
    if ($("#communityEngagementUnit option:selected").val() == 1) {
        $('.hcommunityEngagementUnit').hide();
    }
    else {
        $('.hcommunityEngagementUnit').show();

    }
}


function ValidateFileUploaded(oInput, FileNameType) {
    let _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
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
                notify(FileNameType + ": Invalid image type. Only JPEG,PNG,JPG,GIF file type allowed.", 'alert alert-danger');

                return false;
            }
        }
    }
    return true;
}


function readURL(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
            $('#CBEProjectLogo')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);

        let displayimage = document.getElementById("display-image");
        displayimage.style.display = "block";
    }
}



function GetProjectDetails() {
    console.log("Testing")

    $.ajax({
        type: "GET",
        url: config.serverPath + 'project/GetGeneralProject',
        dataType: "json",
        data: null,
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        success: function (response, textStatus, xhr) {
            if (textStatus === "success" && xhr.status === 200) {
                GetDepartments(response.facultyId);


                setTimeout(function () {
                    document.getElementById("CBEProjectLogo").src = response.projectLogoBase64;
                    document.getElementById('ProjectStartDate').value = cleanIsoDateTime(response.startDate).split(' ')[0];
                    document.getElementById('ProjectEndDate').value = response.endDate ? cleanIsoDateTime(response.endDate).split(' ')[0] : '';
                    document.getElementById('titleOftheProject').value = response.title;
                    document.getElementById('ProjectActualLocationName').value = response.projectAddress;

                    document.getElementById('NumberOfUJStaffInvolved').value = response.numberOfUjstaffInvolved;
                    document.getElementById('NumberOfUJStudentInvolved').value = response.numberOfUjstudentInvolved == null ? 0 : response.numberOfUjstudentInvolved;

                    document.getElementById('ProjectReference').value = response.projectReference;

                    document.getElementById('SustainableDevelopmentGoals').value = response.sustainableDevelopmentGoalId;

                    //if (document.getElementById('roleName').value == "Super Administrator") {
                    document.getElementById('DepartmentUnit').value = response.departmentId;
                    document.getElementById('facultyDivision').value = response.facultyId;
                    // }

                    document.getElementById('CEProjectType').value = response.projectTypeId;
                    document.getElementById('ProjectLocation').value = response.locationScopeId;
                    document.getElementById('IsProjectIndividualOrGroupEffort').value = response.projectEffortId;
                    document.getElementById('DepartmentResponsibleForProject').value = response.departmentResponsibleId;
                    document.getElementById('ProjectDuration').value = response.projectDurationId;


                    document.getElementById('communityEngagementUnit').value = response.communityEngagementUnitId;
                    document.getElementById('NoOfhoursPerStaffVolunteer').value = response.numberOfVolunteerHoursStaff;
                    document.getElementById('NoOfhoursPertudentVolunteer').value = response.numberOfVolunteerHoursStudent;
                    document.getElementById('numberofyears').value = response.projectDurationId == PROJECT_DURATION_ONGOING ? response.numberOfYears : '';
                    document.getElementById('campus').value = response.campusId;
                    onProjectDurationChange();


                    if (response.isFlagship) {

                        $("input[name=flagshipProject][value='Yes']").prop('checked', true);
                    } else {
                        $("input[name=flagshipProject][value='No']").prop('checked', true);
                    }

                    $("#bdyNumberOfUJStaffInvolved").empty();
                    $("#bdyNumberOfUJStudentInvolved").empty();

                    $.each(response.projectVolunteerDetails, function (index, item) {

                        if (item.type == "Staff") {

                            $("#bdyNumberOfUJStaffInvolved").append('<tr><td><input name="Staff[' + index + '].Name" type="text" class="form-control name" value="' + item.name + '">' +
                                '<input name="Staff[' + index + '].ProjectVolunteerDetailsId" type="hidden"  value="' + item.projectVolunteerDetailsId + '" readonly class="form-control projectVolunteerDetailsId">' +
                                '<input name="Staff[' + index + '].GeneralProjectId" type="hidden" value="' + item.generalProjectId + '" readonly class="form-control generalProjectId">' +

                                '</td>' +
                                '<td><input name="Staff[' + index + '].Telephone" type="text" placeholder="" class="form-control telephone" maxlength="10" value="' + item.contactNumber + '"></td>' +
                                '<td class="text-center"><a class="btn btn-lg delete-staff" edu-data-id="1"><i class="la la-trash la-lg text-danger">Remove</i></a></td>' +
                                '</tr>');

                            $('#bdyNumberOfUJStaffInvolved input[name = "Staff[' + index + '].Telephone"]').on('keyup', function (e) {
                                isNumericTelephone(e);
                            });
                        } else {
                            $("#bdyNumberOfUJStudentInvolved").append('<tr><td><input name="Student[' + index + '].Name" type="text" class="form-control name" value="' + item.name + '" readonly>' +
                                '<input name="Student[' + index + '].ProjectVolunteerDetailsId" type="hidden" value="' + item.projectVolunteerDetailsId + '" readonly class="form-control projectVolunteerDetailsId">' +
                                '<input name="Student[' + index + '].GeneralProjectId" type="hidden" value="' + item.generalProjectId + '" readonly class="form-control generalProjectId">' +
                                '</td>' +
                                '<td><input name="Student[' + index + '].Telephone" type="text" maxlength="10" placeholder="" class="form-control telephone" value="' + item.contactNumber + '" readonly></td>' +
                                '<td class="text-center"><a class="btn btn-lg delete-staff" edu-data-id="1"><i class="la la-trash la-lg text-danger">Remove</i></a></td>' +
                                '</tr>');

                            $('#bdyNumberOfUJStudentInvolved input[name = "Staff[' + index + '].Telephone"]').on('keyup', function (e) {
                                isNumericTelephone(e);
                            });
                        }
                    });

                    $("#bdyProjectProgress").empty();
                    if (response.projectDurationId == PROJECT_DURATION_ONGOING) {
                        $.each(response.projectProgresses, function (index, item) {

                            $("#bdyProjectProgress").append('<tr>' +
                                '<td><input name="ProjectProgress[' + index + '].Year" type="text" rows="5" cols="100" value="' + item.year + '" readonly class="form-control year" style="background-color: transparent!important; border: 0!important;">' +
                                '<input name="ProjectProgress[' + index + '].ProjectProgressId" type="hidden" value="' + item.projectProgressId + '" readonly class="form-control projectProgressId">' +
                                '<input name="ProjectProgress[' + index + '].GeneralProjectId" type="hidden" value="' + item.generalProjectId + '" readonly class="form-control generalProjectId">' +

                                '</td>'
                                + '<td><input name="ProjectProgress[' + index + '].ProjectProgressName" type="textarea" rows="5" cols="100" value=" ' + item.projectProgressName + '" class="form-control projectProgressName"></td>' +
                                '<td class="text-center"><a class="btn btn-lg delete-staff" edu-data-id="1"><i class="la la-trash la-lg text-danger">Remove</i></a></td>' +

                                '</tr>');

                        });
                    }


                    let numberOfYears = response.projectDurationId == PROJECT_DURATION_ONGOING ? response.numberOfYears : 0;
                    if (numberOfYears > 0) {
                        $('.btnProjectProgressModal').show();
                    }
                    else {
                        $('.btnProjectProgressModal').hide();
                    }

                    if (response.projectEffortId == 2) {
                        $('.dvProjectEffort').show();
                    }
                    else {
                        $('.dvProjectEffort').hide();
                    }


                    if (response.communityEngagementUnitId == 2) {
                        $('.hcommunityEngagementUnit').show();
                    }
                    else {
                        $('.hcommunityEngagementUnit').hide();
                    }

                    //-----------------------------------------------------------
                    let numberOfUJStudentInvolved = response.numberOfUjstudentInvolved;
                    let numberOfhoursPertudentVolunteer = response.numberOfVolunteerHoursStudent;
                    let numberOfUJStaffInvolved = response.numberOfUjstaffInvolved;
                    let numberOfhoursPerStaffVolunteer = response.numberOfVolunteerHoursStaff;
                    let totalvolunteerhoursStaff = parseFloat(numberOfUJStaffInvolved) * parseFloat(numberOfhoursPerStaffVolunteer);

                    let totalvolunteerhoursStudent = parseFloat(numberOfUJStudentInvolved) * parseFloat(numberOfhoursPertudentVolunteer);

                    document.getElementById("totalvolunteerhoursStudent").value = totalvolunteerhoursStudent;

                    document.getElementById("totalvolunteerhoursStaff").value = totalvolunteerhoursStaff;

                    document.getElementById("grandTotalVolunteerHhours").value = parseFloat(totalvolunteerhoursStudent) + parseFloat(totalvolunteerhoursStaff);

                    //-------------------------------------------------------------------------------------------------------------------

                    let displayimage = document.getElementById("display-image");
                    displayimage.style.display = "block";

                    document.getElementById("NoOfhoursPerStaffVolunteer").readOnly = $("#NoOfhoursPerStaffVolunteer").val() == "" || $("#NoOfhoursPerStaffVolunteer").val() == 0 ? true : false;
                    document.getElementById("NoOfhoursPertudentVolunteer").readOnly = $("#NoOfhoursPertudentVolunteer").val() == "" || $("#NoOfhoursPertudentVolunteer").val() == 0 ? true : false;

                    if (numberOfUJStaffInvolved) {
                        $($($("#NoOfhoursPerStaffVolunteer").parent().siblings('label')[0]).find('span')).removeAttr('hidden');
                    }
                    if (numberOfUJStudentInvolved) {
                        $($($("#NoOfhoursPertudentVolunteer").parent().siblings('label')[1]).find('span')).removeAttr('hidden');
                    }

                }, 800);
            }
            else {
                notify('Genral information: Internal Server Error', 'alert alert-danger');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {

            notify('Genral information: Internal Server Error', 'alert alert-danger');
        }
    });
}

function Cancel() {
    document.location = config.serverPath + "dashboard/dashboard";
}

//function GetFlagshipexist(IsFlafship) {

//    let DepartmentValue = $("#DepartmentUnit option:selected").val()
//    if (DepartmentValue === undefined || DepartmentValue === "0" || DepartmentValue === "" || DepartmentValue === null) {

//        notify('Please select department first', 'alert alert-danger');
//        return false;
//    }

//    $.ajax({
//        type: "GET",
//        url: config.serverPath + 'project/Isflagshipexist?departmentId=' + DepartmentValue,
//        data: null,
//        headers: {
//            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
//        },
//        success: function (response, textStatus, xhr) {
//            if (textStatus === "success" && xhr.status === 200) {

//                if (response == "true" && IsFlafship == "Yes") {
//                    notify('Another project has been highlighted as a flagship project for your division. Please contact the Project Coordinator.', 'alert alert-danger');
//                    $("input[name=flagshipProject][value='No']").prop('checked', true);
//                } else if (response == "false" && IsFlafship == "No") {
//                    notify('Each division is required to have 1 active flagship project. Please ensure that another project is marked as a flagship project', 'alert alert-danger');
//                }
//            }
//            else {
//                notify('Genral information: Internal Server Error', 'alert alert-danger');
//            }
//        },
//        error: function (jqXhr, textStatus, errorThrown) {

//            notify('Genral information: Internal Server Error', 'alert alert-danger');
//        }
//    });
//}
function GetFlagshipExist(isFlagship) {
    const facultyDivisionId = $("#facultyDivision option:selected").val();

    if (!facultyDivisionId || facultyDivisionId === "0") {
        notify('Please select faculty/division first', 'alert alert-danger');
        return false;
    }

    $.ajax({
        type: "GET",
        url: `${config.serverPath}project/Isflagshipexist?facultyId=${facultyDivisionId}`,
        data: null,
        headers: {
            "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
        },
        success: function (response, textStatus, xhr) {
            //console.log(response)
            if (textStatus === "success" && xhr.status === 200) {
                const isExistingFlagship = response === true || response === "true";
                const isCurrentFlagship = isFlagship === "Yes";

                if (isExistingFlagship && isCurrentFlagship) {
                    notify('Another project has been highlighted as a flagship project for your division. Please contact the Project Coordinator.', 'alert alert-danger');
                    $("input[name=flagshipProject][value='No']").prop('checked', true);
                } else if (!isExistingFlagship && !isCurrentFlagship) {
                    notify('Each division is required to have 1 active flagship project. Please ensure that another project is marked as a flagship project', 'alert alert-danger');
                }
            } else {
                notify('General information: Internal Server Error', 'alert alert-danger');
            }
        },
        error: function () {
            notify('General information: Internal Server Error', 'alert alert-danger');
        }
    });
}

function isNumericDigit(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function isNumericTelephone(e) {
    let inputTelephone = $(e.currentTarget);
    let telephoneValue = inputTelephone.val();

    if (telephoneValue != '' && telephoneValue != null) {
        if (!isNumericDigit(telephoneValue)) {
            let position = 0;
            let changedChar = e.originalEvent.key;

            if (changedChar != "" && changedChar != null) {
                position = telephoneValue.indexOf(changedChar);
            }

            telephoneValue = telephoneValue.slice(0, position) + telephoneValue.slice(position + 1);
            inputTelephone.val(telephoneValue);
            notify('Telephone number can only contain digits between 0 to 9.', 'alert alert-danger');
        }
    }
}

// Function to validate student entries
function validateStudentEntries() {
    const numberOfUJStudentInvolved = parseInt($("#NumberOfUJStudentInvolved").val()) || 0;
    const studentCountInTable = $("#bdyNumberOfUJStudentInvolved tr").length;

    // If number of students is 0, no need to validate
    if (numberOfUJStudentInvolved === 0) {
        return true;
    }

    // Check if the count matches
    if (studentCountInTable !== numberOfUJStudentInvolved) {
        notify(`Number of students added (${studentCountInTable}) does not match the number of students entered (${numberOfUJStudentInvolved})`, 'alert alert-danger');
        return false;
    }

    // Validate each student entry
    let allValid = true;
    $("#bdyNumberOfUJStudentInvolved tr").each(function () {
        const studentNumber = $(this).find('input[type="hidden"]').val();
        const name = $(this).find('.name').val();
        const telephone = $(this).find('.telephone').val();

        if (!studentNumber || studentNumber.trim() === "") {
            notify('Student number is required for all entries', 'alert alert-danger');
            allValid = false;
            return false; // breaks the each loop
        }

        if (!name || name.trim() === "") {
            notify('Student name is required for all entries', 'alert alert-danger');
            allValid = false;
            return false;
        }

        if (telephone && !/^\d{10}$/.test(telephone)) {
            notify('Telephone number must be 10 digits if provided', 'alert alert-danger');
            allValid = false;
            return false;
        }
    });

    return allValid;
}