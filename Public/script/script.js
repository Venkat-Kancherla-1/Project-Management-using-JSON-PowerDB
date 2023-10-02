var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpbdIML = '/api/iml';
var DatabaseName = 'Project-Management';
var RelationName = 'Projects-table';
var connectionToken = process.env.connectionToken;

$('#projid').focus();

function alertHandlerHTML(status, message) {
    
    if (status === 1) {
        return `<div class="alert  alert-primary d-flex align-items-center alert-dismissible " role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>
                <div>
                  <strong>Success!</strong> ${message}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`;
    } else {
        return `<div class="alert  alert-warning d-flex align-items-center alert-dismissible" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>
          <strong>Warning!</strong> ${message}
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    }

}

function alertHandler(status, message) {
    var alterHTML = alertHandlerHTML(status, message);
    let alertDiv = document.createElement('div');
    alertDiv.innerHTML = alterHTML;
    $('#disposalAlertContainer').append(alertDiv);
}

function saveRecNoToLocalStorage(jsonObject) {
    var lvData = JSON.parse(jsonObject.data);
    localStorage.setItem('recordNo', lvData.rec_no);
}

function disableAllFieldExceptProjID() {
    $('#projName').prop('disabled', true);
    $('#assigned').prop('disabled', true);
    $('#assigndate').prop('disabled', true);
    $('#deadline').prop('disabled', true);
}

function resetForm() {
    $('#projid').val("");
    $('#projName').val("");
    $('#assigned').val("");
    $('#assignDate').val("");
    $('#deadline').val("");
    disableAllFieldExceptProjID();
    $('#projid').focus();
}

function fillData(jsonObject) {
    if (jsonObject === "") {
        $('#projName').val("");
        $('#assigned').val("");
        $('#assignDate').val("");
        $('#deadline').val("");
    } else {
        saveRecNoToLocalStorage(jsonObject);
        
        var data = JSON.parse(jsonObject.data).record;
        
        $('#projName').val(data.projName);
        $('#assigned').val(data.assigned);
        $('#assignDate').val(data.assignDate);
        $('#deadline').val(data.deadline);
    }
}


function validatedeadline() {
    var inputassigndate = $('#assignDate').val();
    var inputdeadline = $('#deadline').val();
    inputassigndate = new Date(inputassigndate);
    inputdeadline = new Date(inputdeadline);
    
    return inputassigndate.getTime() < inputdeadline.getTime();

}

function validateFormData() {
    var projid, projName, assigned, assignDate, deadline;
    projid = $('#projid').val();
    projName = $('#projName').val();
    assigned = $('#assigned').val();
    assignDate = $('#assignDate').val();
    deadline = $('#deadline').val();

    if (projid === '') {
        alertHandler(0, 'Project ID is Missing');
        $('#projid').focus();
        return "";
    }

    if (projid <= 0) {
        alertHandler(0, 'Invalid Project ID');
        $('#projid').focus();
        return "";
    }

    if (assigned === '') {
        alertHandler(0, 'Assigned to is Missing');
        $('#assign').focus();
        return "";
    }
    if (assigned <= 0 && assigned > 12) {
        alertHandler(0, 'Invalid Name');
        $('#assigned').focus();
        return "";
    }
    if (assignDate === '') {
        alertHandler(0, 'Birth Date Is Missing');
        $('#assignDate').focus();
        return "";
    }
    if (assignDate === '') {
        alertHandler(0, 'Enrollment Date Is Missing');
        $('#deadline').focus();
        return "";
    }

    if (!validatedeadline()) {
        alertHandler(0, 'Invalid Enrollment Date(i.e Enrollment Date should be greater than Birth Date)');
        $('#assignDate').focus();
        return "";
    }

    var jsonStrObj = {
        projid: projid,
        projName: projName,
        assigned: assigned,
        assignDate: assignDate,
        deadline: deadline
    };
    
    return JSON.stringify(jsonStrObj);
}


function getProjectNoAsJsonObj() {
    var projid = $('#projid').val();
    var jsonStr = {
        projid: projid
    };
    return JSON.stringify(jsonStr);
}


function getStudentData() {

     
    if ($('#projid').val() === "") { 
        disableAllFieldExceptProjID();
    } else if ($('#projid').val() < 1) {
        disableAllFieldExceptProjID();
        alertHandler(0, 'Invalid Project ID');
        $('#projid').focus();
    } else {
        var getProjIDJsonObj = getProjectNoAsJsonObj(); 
        
        var getRequest = createGET_BY_KEYRequest(connectionToken, DatabaseName, RelationName, getProjIDJsonObj);
        
        jQuery.ajaxSetup({async: false});
        var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
        jQuery.ajaxSetup({async: true});
        
        $('#projid').prop('disabled', false);
        $('#projName').prop('disabled', false);
        $('#assigned').prop('disabled', false);
        $('#assignDate').prop('disabled', false);
        $('#deadline').prop('disabled', false);

        
        if (resJsonObj.status === 400) { 
            $('#resetBtn').prop('disabled', false);
            $('#saveBtn').prop('disabled', false);
            $('#updateBtn').prop('disabled', true);
            fillData("");
            $('#projName').focus();
        } else if (resJsonObj.status === 200) {
            $('#projid').prop('disabled', true);
            fillData(resJsonObj);
            $('#resetBtn').prop('disabled', false);
            $('#updateBtn').prop('disabled', false);
            $('#saveBtn').prop('disabled', true);
            $('#name').focus();
        }
    }



}

function saveData() {
    var jsonStrObj = validateFormData();
    
    if (jsonStrObj === '')
        return '';

    var putRequest = createPUTRequest(connectionToken, jsonStrObj, DatabaseName, RelationName);
    jQuery.ajaxSetup({async: false});
    
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpbdIML);
    jQuery.ajaxSetup({async: true});
    
    if (resJsonObj.status === 400) {
        alertHandler(0, 'Data Is Not Saved ( Message: ' + resJsonObj.message + " )");
    } else if (resJsonObj.status === 200) {
        alertHandler(1, 'Data Saved successfully');
    } 
    resetForm();
    
    $('#projid').focus();
}



function changeData() {
    $('#changeBtn').prop('disabled', true);
    var jsonChg = validateFormData();
    
    var updateRequest = createUPDATERecordRequest(connectionToken, jsonChg, DatabaseName, RelationName, localStorage.getItem("recordNo"));
    jQuery.ajaxSetup({async: false});
    
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpbdIML);
    jQuery.ajaxSetup({async: true});
    
    if (resJsonObj.status === 400) {
        alertHandler(0, 'Data Is Not Update ( Message: ' + resJsonObj.message + " )");
    } else if (resJsonObj.status === 200) {
        alertHandler(1, 'Data Update successfully');
    }
    resetForm();
    $('#projid').focus();
}


