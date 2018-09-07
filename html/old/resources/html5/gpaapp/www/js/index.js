//localStorage.clear();
var loadingimg = $(document.createElement('img'));
//loadingimg.attr('src', 'img/icons/loading-icon.gif');
loadingimg.css({
    "display": "block",
    "margin-left": "25%",
    "text-align": "center"
});
$('.ui-icon-loading').prepend(loadingimg);

var app = {
    testing:true,    
        
        // Application Constructor
    initialize: function() {
        //Register Templates    //TODO: put each in repsoective Controller
        templateLoader.register({ key: "loginPage", path: "templates/loginPage.html" });
        templateLoader.register({ key: "error", path: "templates/error.html" });
        templateLoader.register({ key: "success", path: "templates/success.html" });
        templateLoader.register({ key: "mainPage", path: "templates/mainPage.html" });
        templateLoader.register({ key: "termItem", path: "templates/partials/termItem.html" });
        templateLoader.register({ key: "termPage", path: "templates/termPage.html" });
        templateLoader.register({ key: "courseItem", path: "templates/partials/courseItem.html" });
        templateLoader.register({ key: "coursePage", path: "templates/coursePage.html" });
        templateLoader.register({ key: "assignItem", path: "templates/partials/assignItem.html" });
        templateLoader.register({ key: "assignPage", path: "templates/assignPage.html" });
        templateLoader.register({ key: "header", path: "templates/partials/header.html" });
        Handlebars.registerPartial("header", templateLoader.html("header"));
        this.bindEvents();
        app.loadSettings(loginPage.initialize);
        
        _userData = createTestData();
	
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $('.app').on('swipeleft', this.onSwipeLeft);
        $('.app').on('swiperight', this.onSwipeRight);
        document.body.addEventListener('touchmove', function(event) {
                                        event.preventDefault();
                                      }, false); 
        $('#app').on('click','.header h1', this.onHeaderClick);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.loadSettings();
        app.resize();
    },
    onHeaderClick:function(event){
        console.log('headerClicked');
        var target = event.target;
        var goto = (target.dataset.back).split("--");
        if (goto[0] === 'main'){
            mainPage.initialize()
        }else if(goto[0] === 'term'){
            var t = findTermById(goto[1]);
            if (t !== false){
                _currentTerm = t;
                termPage.initialize();
            }else{
                app.showErrorMessage('Unable to load Course. Could Not Find Course With ID: ' + goto[1]);
            }
        }else if(goto[0] === 'course'){
            var c = findCourseById(goto[1]);
            if (c !== false){
                _currentCourse = c;
                coursePage.initialize();
            }else{
                app.showErrorMessage('Unable to load Course. Could Not Find Course With ID: ' + goto[1]);
            }
        }
        
    },
    loadSettings: function(callback){
        callback = (callback === undefined) ? function(){}: callback;
        app.settings = localStorage.getItem('appSettings');
        if (!app.settings){
            //Settings dont exist, load defaults from file
            $.ajax({
                url: 'data/defaults.json',
                dataType: 'json',
                async: false,
                success: function(response){
                //Preform first launch here
                    console.log(response);
                    app.settings = response;
                    app.saveSettings(callback);	
		    

                },
                error: function(error){
                    alert('Unable to retrieve default settings. Please Contact the Developer');
                },
                complete: function(){
                    //Hide Splash screen
                }
            }); 
        }else{
            app.settings = JSON.parse(app.settings);
            //prevent multiple increments of launch num by making sure its
            //10 seconds past the last time that the app was started
            var t = moment.utc().format("X");
            if ((t-app.settings.lastLaunch) > 10){
                ++app.settings.launchNum;
                app.settings.lastLaunch = t;
            }
            app.saveSettings(callback);
            console.log(app.settings);
        }
        
        
        
        
    },
    saveSettings: function(callback){
        var settingsJSON = JSON.stringify(app.settings);
        localStorage.setItem('appSettings', settingsJSON);
        callback();
    },
    
    //A method for transitioning from one page to another
    pageTransition: function(fromPageID, toPageID, toPageElement){
        if (toPageElement){
            document.getElementById("app").appendChild(toPageElement);
            toPageID = toPageElement.id;
        }
        setMenu(false);
        //Fallback to the activePage class if there is not a fromPageID included, for example in the case of menu buttons
        if (fromPageID==null){
            fromPageID= (document.getElementsByClassName('activePage')[0].id);
            
        }
        fromPageID = "#" + fromPageID;
        toPageID = "#" + toPageID;
        console.log(fromPageID+ 'to: ' + toPageID);
        
        //allow a way to instantly go to the toPageID
        if (fromPageID === 'none'){
            $(toPageID).fadeIn(1000)
                        .addClass('activePage')
                        .removeClass('disabledPage');
            return;
        }
        if (fromPageID!==toPageID){
            app.Loading(true);
            
            $(fromPageID).fadeOut(1000, function(){
                $(toPageID).fadeIn(1000)
                        .addClass('activePage')
                        .removeClass('disabledPage');
            }).removeClass('activePage').addClass('disabledPage');
            
            
        }
    },
    loading: function(state){
            if (state){
                $('.ui-loader').css({"display": "block"});
            }
            else{
                $('.ui-loader').css({"display": "none"});
            }
    },
    resize: function(selectors){
        $('.content').css({
            "margin-top": $(".header").outerHeight() + 'px',
            "height":($(window).height()-$(".header").outerHeight())+'px'
        });

        $('.disabledPage').css({
            "display":"none",
        });
        $(window).resize(function(){
            $('.content').css({
                "height":($(window).height()-$(".header").height())+'px'
            });
        });
        
    },
    setHeaderText: function (newText){
        var header = $('.activePage header h1');
        header.fadeOut(function(){
                    document.querySelector('.activePage header h1').textContent = newText;
                    header.fadeIn()
        });
        
    },
    showErrorMessage:function(message, showNow){
        var error = {message: message};
        var errorTemplate = Handlebars.compile(templateLoader.html("error"));
        var errorHTML = $.parseHTML(errorTemplate(error));
        app.alert.queue.push(errorHTML);
        app.showNextAlert();
    },
    showSuccessMessage:function(message, showNow){
        var success = {message: message};
        var successTemplate = Handlebars.compile(templateLoader.html("success"));
        var successHTML = $.parseHTML(successTemplate(success));
        app.alert.queue.push(successHTML);
        app.showNextAlert();
        
    },
    showNextAlert:function(){
        if (app.alert.remaining <= 0){
            if (app.alert.queue.length > 0 ){
                var newMessage = app.alert.queue.shift()[0];
                $('.success, .error').remove();
                app.alert.show(newMessage);
                
                //there is not a pending timeout, set this message as a timeout
                app.alert.timer = setTimeout(function(){
                    //fadeout and remove the message
                    app.alert.hide(".success, .error");
                }, app.settings.alerts.displayTime);
                //makeshift way of telling if a timer is going
                app.alert.remaining = app.settings.alerts.displayTime;
                app.alert.counter = setInterval(function () {
                    app.alert.remaining-=100;
                }, 100);
            }
        }
        
        
    },
    alert:{
        timer:'',
        counter:'',
        remaining:0 ,
        queue: [

        ],
        removeElement:function(element){
            $(element).remove();
        },
        hide:function(element, callback){
            $(element).addClass('animated fadeOutUp');
            setTimeout(function(){
                app.alert.removeElement(element);
                console.log('message Hidden');
                //the message is done, clear the counter interval and resent remaining to 0
                clearTimeout(app.alert.timer);
                clearInterval(app.alert.counter);
                app.alert.remaining = 0;
                app.showNextAlert();
                if (callback){
                    callback();
                }
            }, 500 );
        },
        show:function(element, callback){
            $(element).prependTo('body')
                    .addClass('animated fadeInDown');
            setTimeout(function(){
                console.log('message Shown, calling Callback');
                if (callback){
                    callback();
                }

            },550);
        }
    }
    

	
    
    
};
