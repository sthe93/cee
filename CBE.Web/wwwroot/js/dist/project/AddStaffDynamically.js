
$(document).ready(function () {

    let j = 1;
    let errorShown = false;
    let addedStaffUsername = [];

    // =========================================
    // Show Modal on Add Staff Button Click
    // =========================================
    $(document).on('click', 'a.add-addstaff', function () {
        if ($("#bdyNumberOfUJStaffInvolved tr").length === 0) {
            addedStaffUsername = [];
            j = 1;
        }
        showStaffNumberModal();
    });


    function ErrorTimer() {
        errorShown = true;
        setTimeout(() => { errorShown = false; }, 3000);
    }

    // =========================================
    // Show Staff Modal
    // =========================================
    function showStaffNumberModal() {
        if ($('#staffNumberModal').length === 0) {
            const modalHtml = `
                <div id="staffNumberModal" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:20px; z-index:1000; box-shadow:0 0 10px rgba(0,0,0,0.5); width: 400px;">
                    <div class="form-group mb-3">
                        <label>Enter Username (Manual)</label>
                        <input type="text" id="staffNumberInput" class="form-control mb-2">
                        <button id="confirmStaffNumber" class="btn btn-primary w-100">Add</button>
                    </div>

                    <hr>

                    <div class="form-group mt-3 position-relative">
                        <label>Or Upload CSV File (Multiple)</label>
                        <input type="file" id="staffFileUploadInModal" accept=".csv" class="form-control mb-2">
                        <div id="csvStaffSpinner" style="
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

                        <small class="text-muted">One username per line</small>
                    </div>

                    <div class="d-flex justify-content-end mt-3">
                        <button id="cancelStaffNumber" class="btn btn-secondary">Close</button>
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

        let numberOfUJStaffInvolved = $("#NumberOfUJStaffInvolved").val();

        if (j <= numberOfUJStaffInvolved) {
            $('#staffNumberModal').show();
            $('#staffNumberInput').val('').focus();

            $('#confirmStaffNumber').off('click').on('click', function () {
                handleStaffNumberConfirm();
            });

            $('#cancelStaffNumber').off('click').on('click', function () {
                $('#staffNumberModal').hide();
            });
        } else {
            if (!errorShown) {
                notify('Number of staff cannot be greater than the number of staff involved.', 'alert alert-danger');
                ErrorTimer()
            }
        }
    }

    // =========================================
    // Manual Staff Entry Confirm
    // =========================================
    function handleStaffNumberConfirm() {
        const username = $('#staffNumberInput').val().trim();

        if (!username) {
            if (!errorShown) {
                notify('Please enter a staff username', 'alert alert-danger');
                ErrorTimer()
            }
            return;
        }

        $('#confirmStaffNumber').prop('disabled', true);
        $('#confirmStaffNumber').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');

        fetchStaffDetails(username)
            .then(function (data) {
                addedStaffUsername.push(username);
                addStaffRow(username, data);
                j++;
                $('#staffNumberModal').hide();
            })
            .catch(function (error) {
                console.error("Error:", error);
            })
            .finally(function () {
                $('#confirmStaffNumber').html('Add');
                $('#confirmStaffNumber').prop('disabled', false);
            });
    }

    // =========================================
    // Fetch Staff Details (API)
    // =========================================
    function fetchStaffDetails(username) {
        return new Promise((resolve, reject) => {
            if (addedStaffUsername.includes(username)) {
                notify('This staff has already been added.', 'alert alert-danger');
                reject("Staff already added");
                ErrorTimer()
                return;
            }

            $.ajax({
                type: "GET",
                url: config.serverPath + 'User/GetStaffDetails/' + username,
                dataType: "json",
                headers: {
                    "X-CSRF-TOKEN-HEADERNAME": $('input[name="AntiforgeryFieldname"]').val()
                },
                success: function (response, textStatus, xhr) {
                    if (textStatus === "success" && xhr.status === 200) {
                        if ((!response.fullName || response.fullName.trim() === "") &&
                            (!response.cellPhoneNumber || response.cellPhoneNumber.trim() === "")) {
                            notify('Invalid staff username.', 'alert alert-danger');
                            reject("Invalid staff username");
                            ErrorTimer()
                            return;
                        }

                        if (Array.isArray(response.fullName) && response.fullName.length === 0) {
                            notify('Staff record exists but has no data', 'alert alert-danger');
                            reject("Staff record exists but has no data");
                            ErrorTimer()
                            return;
                        }

                        resolve({
                            fullName: response.fullName || "",
                            cellPhoneNumber: response.cellPhoneNumber || ""
                        });
                    } else {
                        notify('Failed to fetch staff details', 'alert alert-danger');
                        reject("Failed to fetch staff details");
                        ErrorTimer()
                    }
                },
                error: function () {
                    notify('Failed to fetch staff details', 'alert alert-danger');
                    reject("Failed to fetch staff details");
                    ErrorTimer()
                }
            });
        });
    }

    // =========================================
    // Add Staff Row
    // =========================================
    function addStaffRow(username, data) {
        const telValue = data.cellPhoneNumber || "";
        const readonlyAttr = telValue ? "readonly" : "";

        $("#bdyNumberOfUJStaffInvolved").append(`
        <tr>
            <td>
                <input type="hidden" name="Staff[${j}].Staffusername" value="${username}">
                <input name="Staff[${j}].Name" type="text" 
                       class="form-control name" value="${data.fullName}" readonly>
            </td>
            <td>
                <input name="Staff[${j}].Telephone" type="text" maxlength="10" 
                       inputmode="numeric" pattern="\\d*" class="form-control telephone" 
                       value="${telValue}" ${readonlyAttr}>
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
    $('#bdyNumberOfUJStaffInvolved').on('click', '.delete-staff', function () {
        const row = $(this).closest('tr');
        const username = row.find('input[type="hidden"]').val();

        addedStaffUsername = addedStaffUsername.filter(num => num !== username);

        row.remove();
        j--;
        resetValues();
    });

    function resetValues() {
        let counter = 1;
        $("#bdyNumberOfUJStaffInvolved tr").each(function () {
            $(this).find('.name').attr("name", `Staff[${counter}].Name`);
            $(this).find('.telephone').attr("name", `Staff[${counter}].Telephone`);
            $(this).find('input[type="hidden"]').attr("name", `Staff[${counter}].Staffusername`);
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
                    ErrorTimer()
                }
                inputTelephone.val(telephoneValue.replace(/\D/g, ''));
            }
        }
    });

    // =========================================
    // CSV Upload Handling for Staff
    // =========================================
    $(document).on('change', '#staffFileUploadInModal', function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.csv')) {
            notify('Invalid file type. Please upload a CSV file.', 'alert alert-danger');
            ErrorTimer()
            return;
        }

        $('#csvStaffSpinner').show();
        processStaffCSVFile(file);
        $(this).val('');
    });

    function processStaffCSVFile(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            const validUsernames = text.split(/\r?\n/).map(r => r.trim()).filter(r => r !== "");

            const invalidUsernames = validUsernames.filter(r => !/^[a-z]+$/i.test(r));
            if (invalidUsernames.length > 0) {
                $('#csvStaffSpinner').hide();
                notify(
                    `Invalid username(s): ${invalidUsernames.slice(0, 5).join(', ')}${invalidUsernames.length > 5 ? '...' : ''}`,
                    'alert alert-danger'
                );
                ErrorTimer()
                return;
            }
            handleBulkStaffUsernames(validUsernames);
        };
        reader.onerror = function () {
            $('#csvStaffSpinner').hide();
            notify('Error reading file.', 'alert alert-danger');
            ErrorTimer()
        };
        reader.readAsText(file);
    }

    function handleBulkStaffUsernames(usernames) {
        const numberOfUJStaffInvolved = Number($("#NumberOfUJStaffInvolved").val());

        if (j + usernames.length - 1 > numberOfUJStaffInvolved) {
            notify('The number of staff in the file exceeds the number allowed.', 'alert alert-danger');
            $('#csvStaffSpinner').hide();
            ErrorTimer()
            return;
        }

        const fetchPromises = usernames.map(username => {
            if (addedStaffUsername.includes(username)) {
                notify(`Staff ${username} already added.`, 'alert alert-warning');
                ErrorTimer()
                return Promise.resolve(null);
            }

            return fetchStaffDetails(username)
                .then(data => ({ username, data }))
                .catch(error => {
                    console.error("Error fetching staff:", username, error);
                    return null;
                });
        });

        // Wait for all fetches to complete
        Promise.all(fetchPromises).then(results => {
            results.forEach(result => {
                if (result) {
                    const { username, data } = result;
                    addedStaffUsername.push(username);
                    addStaffRow(username, data);
                    j++;
                }
            });

            $('#csvStaffSpinner').hide();
            $('#staffNumberModal').hide();
        });
    }
});
