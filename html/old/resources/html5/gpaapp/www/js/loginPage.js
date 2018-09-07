var loginPage ={
    //initialize the page, load the template, insert content and send it to the Show Method
    initialize: function(){
        console.log('INITIALIZING LOGINPAGE');
        autoLogin();
        var loginPageTemplate = Handlebars.compile(templateLoader.html("loginPage"));
        var loginPageHTML = $.parseHTML(loginPageTemplate(app.settings.loginPage));
        document.getElementById('app').innerHTML = loginPageTemplate(app.settings.loginPage);
        
        $('#menutrigger').css({
            "display":"none"
        });
        loginPage.bindEvents();
        
        
        
    },
    bindEvents:function(){
        $( "#registerUserForm" ).submit(function( event ) {

            // Stop form from submitting normally
            event.preventDefault();
            
            //disable the button to prevent multiple submits
            this.disabled = true;
            
            //call the registerformHash funciton which will in turn call the register user to ajax
            regformhash(this,this.name,this.email,this.registerPassword, this.registerPasswordConfirm);

        });
        $( "#loginForm" ).submit(function( event ) {

            // Stop form from submitting normally
            event.preventDefault();
            
            //disable the button to prevent multiple submits
            this.disabled = true;
            
            //call the user.js formhash function which will in turn call the login user to ajax
            formhash(this,this.password);

        });
    },
    goToRegister:function(){
        app.setHeaderText('Login');
        $('#loginformdiv:visible, #startmessage:visible').fadeOut(function(){
            $('#registerformdiv').fadeIn().css('display','table-cell');
        });
    },
    goToLogin:function(){
        app.setHeaderText('Login'); 
        $('#registerformdiv:visible, #startmessage:visible').fadeOut(function(){
            $('#loginformdiv').fadeIn().css('display','table-cell');
        });
    },
    loadMainPage: function(){
        mainPage.initialize();
        
    }
    
}
