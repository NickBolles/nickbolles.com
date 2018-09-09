
var coursePage = {
    //initialize the page, load the template, insert content and send it to the Show Method
    initialize: function(){
        console.log('INITIALIZING COURSEPAGE');
        $('#menutrigger').css("display", "block");
        this.renderPage();
    },
    renderPage: function(){
        var context;
        if (_currentCourse == {}){
            console.log('USER DATA IS AN EMPTY OBJECT ' + JSON.stringify(_currentCourse));
            context = {};
        }else{
            context = _currentCourse;
        }
        context.header = app.settings.coursePage.header;
        context.header.title = _currentCourse.courseName;
        context.header.back = 'term--' + _currentTerm.termId;
        Handlebars.registerPartial("assignItem", templateLoader.html("assignItem"));
        var mainPageTemplate = Handlebars.compile(templateLoader.html("coursePage"));
        var mainPageHTML = $.parseHTML(mainPageTemplate(context));
        $('.page').remove();
        $('#app').append(mainPageHTML);
        app.resize();
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        coursePage.termScroll = new IScroll('#assignListWrapper', {
            mouseWheel: true,
            scrollbars: true
        });
        //Bind the events after the page is finished loading
        this.bindEvents();
    },
    bindEvents:function(){
        //bind the wrapper to the click event, because of event bubbling
        //this will be thrown and in the handler find which item was clicked
        $('.assignListWrapper').on('click', '.assignItem', this.onAssignItemClick);
    },
    onAssignItemClick:function(event){
        var clicked= this;
        var id = clicked.dataset.assignid;
        console.log('Id is ' + id);
        var a = findAssignById(id);
        console.log(a);
        if (a !== false){
            _currentAssign = a;
            assignPage.initialize();
        }else{
            app.showErrorMessage('Unable to load Assign. Could Not Find Assign With ID: ' + id);
        }
    }
    
}
