var currentUser ={
    data: {
        
    },
    settings:{
        
    },
    token:'',
    
    
};


function registerUser(form){
    var data = $(form.name).serialize() + '&' + $(form.email).serialize() + '&' +  $(form.p).serialize() + '&' +  $(form.uuid).serialize() + '&' + $(form.appName).serialize();
    var errorMessage;
    var successMessage;
    console.log('Login to: ' + form.getAttribute('action'));
    //run an AJAX post request to your server-side script, $this.serialize() is the data from your form being added to the request
    $.ajax({
        type: "POST",
        url:  form.getAttribute('action'),
        data: data,
        xhrFields: {
            withCredentials: true
        },
        success: function(response){
            //Check for error Message
            console.log(response);
            
            var json = response;
            
            if (json.message === 'AccountCreated'){
                successMessage = 'Registration Successfull... Please Wait While We Do Initial Setup';
                
                form.setAttribute('action', app.settings.loginPage.loginURL)
                loginUser(form);
            }
            else{
                errorMessage = 'Server Response unreadable. Please Contact Developer for more information.';
            }
                
            
        
        },
        error:function(e){
            if (e.responseJSON){
                errorMessage = e.responseJSON.message;
            }else{
                errorMessage = 'Error Connecting with Server. Please Try Again';
            }
        },
        complete: function (){
            if (errorMessage){
                app.showErrorMessage(errorMessage);
            }else{
                app.showSuccessMessage(successMessage);
                form.setAttribute('action', app.settings.loginPage.registerURL)
            }
        }
    });
    

}
function loginUser(form){
    var errorMessage;
    var successMessage;
    var appName = form.appName;
    var data = $(form.email).serialize() + '&' +  $(form.p).serialize() + '&' + $(appName).serialize();
    console.log(data);
    console.log('LOGIN to : ' + form.getAttribute('action'));
    $.ajax({
        type: "POST",
        url:  form.getAttribute('action'),
        data: data,
        xhrFields: {
            withCredentials: true
        },
        success: function(response){
            //Check for error Message
            console.log(response);
            var JSON = response;
            //Theres no reason status shouldnt be ok but lets check anyways
            if (JSON.message === 'ok'){
                saveUserLogin(form.email.value, form.p.value);
                //app.goToPage('main-Page');
                successMessage = ' Logged In Successfully!';
                
                syncUserData(null, function(){
                    mainPage.initialize();
                });
                
            }else{
                errorMessage = 'Server Response unreadable. Please Contact Developer for more information.';
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

//Possible options are id, name or email include them in a javascript object   ex. {id:"xxxxxxxxxxx", name: "nick", email:"email"}
//returns a javascript object of the user
/*function getUser(options){
    if (options.name){
       return localStorage.getItem(name);     
    }
    else{
        for (var i=0;i<localStorage.length-1;i++){
            var storageItem = localStorage.getItem(localStorage.key(i));
            storageItem = JSON.parse(storageItem);
            if (options.id === storageItem.id){
                return storageItem;
            }
            else if (options.email === storageItem.email){
                return storageItem;
            }
        }
    }   
}*/
function autoLogin(){
    var user;
    
    var userLogin = JSON.parse(localStorage.getItem('userLogin'));
    if (!$.isEmptyObject(userLogin)){
        
        //get the form
        var errorMessage;
        var successMessage;
        var data = 'email=' + userLogin.email + '&p=' +  userLogin.pass;
        console.log(data);
        console.log('auto login to: ' + app.settings.loginPage.loginURL);
        $.ajax({
            type: "POST",
            url:  app.settings.loginPage.loginURL,
            data: data,
            xhrFields: {
                withCredentials: true
            },
            success: function(response){
                //Check for error Message
                console.log(response);
                var json = response;
                //Theres no reason status shouldnt be ok but lets check anyways
                if (json.message === 'ok'){
                    successMessage = 'Auto Login Successfull!';
                    var userData = localStorage.getItem('userData');
                    syncUserData(userData);

                }else{
                    errorMessage = 'Server Response unreadable. Please Contact Developer for more information.';
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
                    app.showErrorMessage('Unable to auto-login, Please Try Logging in manually');
                }else{
                    app.showSuccessMessage(successMessage);
                }
            }
        });
    }
    
}

function formhash(form, password) {
    app.loading(true);
    //Check to see if the autoLogin has allready created the p element
    if (!form.p){
        // Create a new element input, this will be our hashed password field.
        var p = document.createElement("input");
        // Add the new element to our form. 
        form.appendChild(p);
        p.name = "p";
        p.type = "hidden";
        p.value = hex_sha512(form.password.value);
    }
    // Make sure the plaintext password doesn't get sent. 
    password.value = "";
 
    // Finally submit the form. 
    loginUser(form);
}
 
function regformhash(form,name, email, password, conf) {
    app.loading(true);
     // Check each field has a value
    if (name.value == ''        ||
          email.value == ''     || 
          password.value == ''  || 
          conf.value == '') {
 
        alert('You must provide all the requested details. Please try again');
        return false;
    }
 
    // Check the username
 
    re = /^\w+$/; 
    if(!re.test(form.name.value)) { 
        alert("Name must contain only letters, numbers and underscores. Please try again"); 
        form.username.focus();
        return false; 
    }
 
    // Check that the password is sufficiently long (min 6 chars)
    // The check is duplicated below, but this is included to give more
    // specific guidance to the user
    if (password.value.length < 6) {
        alert('Passwords must be at least 6 characters long.  Please try again');
        form.password.focus();
        return false;
    }
 
    // At least one number, one lowercase and one uppercase letter 
    // At least six characters 
 
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; 
    if (!re.test(password.value)) {
        alert('Passwords must contain at least one number, one lowercase and one uppercase letter.  Please try again');
        return false;
    }
 
    // Check password and confirmation are the same
    if (password.value != conf.value) {
        alert('Your password and confirmation do not match. Please try again');
        form.password.focus();
        return false;
    }
    if (!form.p){
        // Create a new element input, this will be our hashed password field. 
        var p = document.createElement("input");

        // Add the new element to our form. 
        form.appendChild(p);
        p.name = "p";
        p.type = "hidden";
    }
    form.p.value = hex_sha512(password.value);
    
    // Make sure the plaintext password doesn't get sent. 
    password.value = "";
    conf.value = "";
    
    // Create a new element input, this will be our hashed password field. 
    if (!form.uuid){
        var uuid = document.createElement("input");

        // Add the new element to our form. 
        form.appendChild(uuid);
        uuid.name = "uuid";
        uuid.type = "hidden";
        

    }
    form.uuid.value = Math.uuid();
    // Finally submit the form. 
    registerUser(form);
}