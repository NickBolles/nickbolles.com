
var assignPage = {
    //initialize the page, load the template, insert content and send it to the Show Method
    initialize: function(){
        console.log('INITIALIZING ASSIGNPAGE');
        $('#menutrigger').css("display", "block");
        this.renderPage();
    },
    renderPage: function(){
        var context;
        if (_currentAssign == {}){
            console.log('USER DATA IS AN EMPTY OBJECT ' + JSON.stringify(_currentAssign));
            context = {};
        }else{
            context = _currentAssign;
        }
        context.header = app.settings.assignPage.header;
        context.header.title = _currentAssign.assignName;
        context.header.back = 'course--' + _currentCourse.courseId;
        var mainPageTemplate = Handlebars.compile(templateLoader.html("assignPage"));
        var mainPageHTML = $.parseHTML(mainPageTemplate(context));
        $('.page').remove();
        $('#app').append(mainPageHTML);
        app.resize();
        
        //Bind the events after the page is finished loading
        this.bindEvents();
    },
    bindEvents:function(){
        //bind the wrapper to the click event, because of event bubbling
        //this will be thrown and in the handler find which item was clicked
    }
    
}
