var _userData = {};
var _currentTerm = {};
var _currentCourse = {};
var _currentAssign = {};
function syncUserData(userData, callback){
     //For Testing purposes, create the test data
     userData = createTestData();
     
     
    //Get the data URL from the settings
    var url = app.settings.data.dataURL;
    //if userData is null then GET otherwise POST
    var method = (userData == null || userData == "null") ? "GET" : "POST";
    //if userData is null, set it to '' so that no data is sent
    //var userData = (userData == null) ? '' : userData;
    
    
    
    if (app.testing){
        console.log('Syncing UserData, method is ' + method + ' URL is ' + url + ' data is ' +  userData)
        console.log('UserData is a ' + typeof userData);
    };
    
    
    //ensure that userData is an object
    toObj(userData);
    
    //save the userData before sending it to the server
    saveUserData(userData);
    
    var successMessage;
    var errorMessage;
    $.ajax({
        type: method,
        url:  url,
        data: userData,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(response){
            //Check for error Message
            
            //Theres no reason status shouldnt be ok but lets check anyways
            if (response.message === 'ok'){
                if (response.data){
                    successMessage='Data Recieved From Server Successfully!';
                    
                    userData = JSON.parse(response.data);
                    saveUserData(userData, function(){
                        mainPage.initialize();
                    });
                    
                    
                    
                }
                else{
                    successMessage = 'Data Saved On Server Successfully!';
                                      
                    mainPage.initialize();
                }
                
            }else{
                errorMessage = 'Error Syncing Data. Server Response unreadable.';
            }
                
            
        },        
        error:function(e){
            if (e.responseJSON){
                errorMessage = e.responseJSON.message;
            }else{
                errorMessage = 'Error Connecting with Server. Please Try Again';
            }
        },
        complete: function(){
             if (errorMessage){
                app.showErrorMessage(errorMessage);
            }else{
                app.showSuccessMessage(successMessage);
            }
        }
    });
    
    
}


function saveUserData(userData){
    //if userJSON is not passed in then use the currentUser
   var userData = (userData == null) ? _userData: userData;
   
   if (typeof userData !== 'string'){
        console.log('UserData is not an string');
        if (typeof userData === 'object'){
            //Stringify the user for saving
            var userJSON = JSON.stringify(userData);
        }else{
            console.log('ERROR: user data is not parsable...');
            app.showErrorMessage('Unable to Save User Data!');
            return;
        }    
    }
    //save the JSON to localstorage 
    localStorage.setItem('userData', userJSON);
    _userData = userData;
}
function loadUserData(){
    _userData = localStorage.getItem('userData');
}
function saveUserLogin(email, pass){
    var data = {email: email, pass: pass};
    localStorage.setItem('userLogin', JSON.stringify(data));
}


function findTermById(id){
    for (term in _userData.terms){
        var t = _userData.terms[term];
        if (t.termId === id){
            return t;
        }
    }
    return false;
}
function findCourseById(id){
    for (course in _currentTerm.courses){
        var c = _currentTerm.courses[course];
        if (c.courseId === id){
            return c;
        }
    }
    return false;
}
function findAssignById(id){
    for (assign in _currentCourse.assigns){
        var a = _currentCourse.assigns[assign];
        if (a.assignId === id){
            return a;
        }
    }
    return false;
}