$(document).ready(function () {
    console.log("Document ready");

    let j = 1;
    let errorShown = false;
    let addedStudentNumbers = [];

    // =========================================
    // Show Modal on Add Student Button Click
    // =========================================
    $(document).on('click', 'a.add-addstudent', function () {
        if ($("#bdyNumberOfUJStudentInvolved tr").length === 0) {
            addedStudentNumbers = [];
            j = 1;
        }
        showStudentNumberModal();
    });

    function ErrorTimer() {
        errorShown = true;
        setTimeout(() => { errorShown = false; }, 3000);
    }

    function showStudentNumberModal() {
        if ($('#studentNumberModal').length === 0) {
            const modalHtml = `
                <div id="studentNumberModal" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:20px; z-index:1000; box-shadow:0 0 10px rgba(0,0,0,0.5); width: 400px;">
                    <div class="form-group mb-3">
                        <label>Enter Student Number (Manual)</label>
                        <input type="text" id="studentNumberInput" class="form-control mb-2">
                        <button id="confirmStudentNumber" class="btn btn-primary w-100">Add</button>
                    </div>

                    <hr>

                    <div class="form-group mt-3 position-relative">
                        <label>Or Upload CSV File (Multiple)</label>
                        <input type="file" id="studentFileUploadInModal" accept=".csv" class="form-control mb-2">

                        <div id="csvStudentSpinner" style="
                            display:none;
                            position:absolute;
                            top:50%;
                            left:50%;
                            transform:translate(-50%, -50%);
                            z-index:1300;
                            background:rgba(255,255,255,0.7);
                            padding:20px 30px;
                            border-radius:10px;
                            text-align:center;
                            font-size:28px;"
                            >
                           <button class="btn btn-primary d-flex align-items-center justify-content-center" type="button" disabled
                                   style="padding:12px 24px; font-size:20px; gap:10px;">
                             <span class="spinner-grow" role="status" aria-hidden="true"
                                   style="width:2rem; height:2rem;"></span>
                             <span>Loading...</span>
                           </button>
                        </div>

                        <small class="text-muted">One student number per line</small>
                    </div>

                    <div class="d-flex justify-content-end mt-3">
                        <button id="cancelStudentNumber" class="btn btn-secondary">Close</button>
                    </div>
                </div>`;
            $('body').append(modalHtml);
        }

        if (!$('#custom-spinner-style').length) {
            $('head').append(`
                <style id="custom-spinner-style">
                    @keyframes spinner-grow {
                        0% { transform: scale(0); }
                        50% { opacity: 1; }
                        100% { transform: scale(1); opacity: 0; }
                    }

                    .spinner-grow {
                        display: inline-block;
                        width: 1.5rem;
                        height: 1.5rem;
                        vertical-align: text-bottom;
                        background-color: currentColor;
                        border-radius: 50%;
                        opacity: 0;
                        animation: spinner-grow 0.75s linear infinite;
                    }
                   
                    .spinner-grow-lg {
                        width: 2rem;
                        height: 2rem;
                    }
                </style>
            `);
        }

        let numberOfUJStudentInvolved = $("#NumberOfUJStudentInvolved").val();

        if (j <= numberOfUJStudentInvolved) {
            $('#studentNumberModal').show();
            $('#studentNumberInput').val('').focus();

            $('#confirmStudentNumber').off('click').on('click', function () {
                handleStudentNumberConfirm();
            });

            $('#cancelStudentNumber').off('click').on('click', function () {
                $('#studentNumberModal').hide();
            });
        } else {
            if (!errorShown) {
                notify('Number of students cannot be greater than the number of students involved.', 'alert alert-danger');
                ErrorTimer();
            }
        }
    }

    // =========================================
    // Manual Student Number Confirm
    // =========================================
    function handleStudentNumberConfirm() {
        const studentNumber = $('#studentNumberInput').val().trim();

        if (!studentNumber) {
            if (!errorShown) {
                notify('Please enter a student number', 'alert alert-danger');
                ErrorTimer();
            }
            return;
        }

        $('#confirmStudentNumber').prop('disabled', true);
        $('#confirmStudentNumber').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');

        fetchStudentDetails(studentNumber)
            .then(function (data) {
                addedStudentNumbers.push(studentNumber);
                addStudentRow(studentNumber, data);
                j++;
                $('#studentNumberModal').hide();
            })
            .catch(function (error) {
                console.error("Error:", error);
            })
            .finally(function () {
                $('#confirmStudentNumber').html('Add');
                $('#confirmStudentNumber').prop('disabled', false);
            });
    }

    // =========================================
    // Fetch Student Details (API)
    // =========================================
    function fetchStudentDetails(studentNumber) {
        return new Promise((resolve, reject) => {
            if (addedStudentNumbers.includes(studentNumber)) {
                notify('This student has already been added.', 'alert alert-danger');
                reject("Student already added");
                ErrorTimer();
                return;
            }

            $.ajax({
                type: "GET",
                url: config.serverPath + 'User/GetStudent/' + studentNumber,
                dataType: "json",
                headers: {
                    "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
                },
                success: function (response, textStatus, xhr) {
                    if (textStatus === "success" && xhr.status === 200) {
                        if ((!response.name || response.name.trim() === "") &&
                            (!response.cellNumber || response.cellNumber.trim() === "")) {
                            notify('Invalid student number.', 'alert alert-danger');
                            reject("Invalid student number");
                            ErrorTimer();
                            return;
                        }

                        if (Array.isArray(response.name) && response.name.length === 0) {
                            notify('Student record exists but has no data', 'alert alert-danger');
                            reject("Student record exists but has no data");
                            ErrorTimer();
                            return;
                        }

                        resolve({
                            name: response.name || "",
                            cellNumber: response.cellNumber || ""
                        });
                    } else {
                        notify('Failed to fetch student details', 'alert alert-danger');
                        reject("Failed to fetch student details");
                        ErrorTimer();
                    }
                },
                error: function () {
                    notify('Failed to fetch student details', 'alert alert-danger');
                    reject("Failed to fetch student details");
                    ErrorTimer();
                }
            });
        });
    }

    // =========================================
    // Add Row to Table
    // =========================================
    function addStudentRow(studentNumber, data) {
        $("#bdyNumberOfUJStudentInvolved").append(`
            <tr>
                <td>
                    <input type="hidden" name="Student[${j}].StudentNumber" value="${studentNumber}">
                    <input name="Student[${j}].Name" type="text" 
                           class="form-control name" value="${data.name}" readonly>
                </td>
                <td>
                    <input name="Student[${j}].Telephone" type="text" maxlength="10" 
                           inputmode="numeric" pattern="\\d*" class="form-control telephone" 
                           value="${data.cellNumber}" readonly>
                </td>
                <td class="text-center">
                    <a class="btn btn-lg delete-staff" edu-data-id="1">
                        <i class="la la-trash la-lg text-danger">Remove</i>
                    </a>
                </td>
            </tr>
        `);
    }

    // =========================================
    // Delete Row Functionality
    // =========================================
    $('#bdyNumberOfUJStudentInvolved').on('click', '.delete-staff', function () {
        const row = $(this).closest('tr');
        const studentNumber = row.find('input[type="hidden"]').val();

        addedStudentNumbers = addedStudentNumbers.filter(num => num !== studentNumber);

        row.remove();
        j--;
        resetValues();
    });

    function resetValues() {
        let counter = 1;
        $("#bdyNumberOfUJStudentInvolved tr").each(function () {
            $(this).find('.name').attr("name", `Student[${counter}].Name`);
            $(this).find('.telephone').attr("name", `Student[${counter}].Telephone`);
            $(this).find('input[type="hidden"]').attr("name", `Student[${counter}].StudentNumber`);
            counter++;
        });
    }

    // =========================================
    // Telephone Number Validation
    // =========================================
    $(document).on('keyup', '.telephone', function (e) {
        let inputTelephone = $(this);
        let telephoneValue = inputTelephone.val();

        if (telephoneValue != '' && telephoneValue != null) {
            if (!/^\d+$/.test(telephoneValue)) {
                if (!errorShown) {
                    notify('Telephone number can only contain digits between 0 to 9.', 'alert alert-danger');
                    ErrorTimer();
                }
                inputTelephone.val(telephoneValue.replace(/\D/g, ''));
            }
        }
    });

    // =========================================
    // 📂 CSV Upload Handling in Modal
    // =========================================
    $(document).on('change', '#studentFileUploadInModal', function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.csv')) {
            notify('Invalid file type. Please upload a CSV file.', 'alert alert-danger');
            ErrorTimer();
            return;
        }

        $('#csvStudentSpinner').show();
        processCSVFile(file);
        $(this).val('');
    });

    function processCSVFile(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            const validStudentNumber = text.split(/\r?\n/).map(r => r.trim()).filter(r => r !== "");
            const invalidStudentNumbers = validStudentNumber.filter(r => !/^\d{9}$/.test(r));
            const studentNumber = validStudentNumber;

            if (invalidStudentNumbers.length > 0) {
                $('#csvStudentSpinner').hide();
                notify(
                    `Invalid student number(s): ${invalidStudentNumbers.slice(0, 5).join(', ')}${invalidStudentNumbers.length > 5 ? '...' : ''}`,
                    'alert alert-danger'
                );
                ErrorTimer();
                return;
            }
            handleBulkStudentNumbers(studentNumber);
        };
        reader.onerror = function () {
            $('#csvStudentSpinner').hide();
            notify('Error reading file.', 'alert alert-danger');
            ErrorTimer();
        };
        reader.readAsText(file);
    }

    function handleBulkStudentNumbers(studentNumber) {
        let numberOfUJStudentInvolved = $("#NumberOfUJStudentInvolved").val();

        if (j + studentNumber.length - 1 > numberOfUJStudentInvolved) {
            notify('The number of students in the file exceeds the number allowed.', 'alert alert-danger');
            $('#csvStudentSpinner').hide();
            ErrorTimer();
            return;
        }

        const fetchPromises = studentNumber.map(studentNumber => {
            if (addedStudentNumbers.includes(studentNumber)) {
                notify(`Student ${studentNumber} already added.`, 'alert alert-warning');
                ErrorTimer();
                return Promise.resolve(null);
            }

            return fetchStudentDetails(studentNumber)
                .then(data => ({ studentNumber, data }))
                .catch(error => {
                    console.error("Error fetching student number:", studentNumber, error);
                    return null;
                })
        })


        Promise.all(fetchPromises).then(results => {
            results.forEach(result => {
                if (result) {
                    const { studentNumber, data } = result;
                    addedStudentNumbers.push(studentNumber);
                    addStudentRow(studentNumber, data);
                    j++;
                }
            })
            $('#csvStudentSpinner').hide();
            $('#studentNumberModal').hide();
        })
    }
});
