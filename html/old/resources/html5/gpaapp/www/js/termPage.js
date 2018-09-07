
var termPage = {
    //initialize the page, load the template, insert content and send it to the Show Method
    initialize: function(){
        console.log('INITIALIZING TERMPAGE');
        $('#menutrigger').css("display", "block");
        this.renderPage();
    },
    renderPage: function(){
        var context;
        if (_currentTerm == {}){
            console.log('USER DATA IS AN EMPTY OBJECT ' + JSON.stringify(_currentTerm));
            context = {};
        }else{
            context = _currentTerm;
        }
        context.header = app.settings.termPage.header;
        context.header.title = _currentTerm.termName;
        context.header.back = 'main';
        Handlebars.registerPartial("courseItem", templateLoader.html("courseItem"));
        var mainPageTemplate = Handlebars.compile(templateLoader.html("termPage"));
        var mainPageHTML = $.parseHTML(mainPageTemplate(context));
        $('.page').remove();
        $('#app').append(mainPageHTML);
        app.resize();
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        termPage.termScroll = new IScroll('#courseListWrapper', {
            mouseWheel: true,
            scrollbars: true
        });
        //Bind the events after the page is finished loading
        this.bindEvents();
    },
    bindEvents:function(){
        //bind the wrapper to the click event, because of event bubbling
        //this will be thrown and in the handler find which item was clicked
        $('.courseListWrapper').on('click', '.courseItem', this.onCourseItemClick);
    },
    onCourseItemClick:function(event){
        var clicked= this;
        var id = clicked.dataset.courseid;
        console.log('Id is ' + id);
        var c = findCourseById(id);
        console.log(c);
        if (c !== false){
            _currentCourse = c;
            coursePage.initialize();
        }else{
            app.showErrorMessage('Unable to load Course. Could Not Find Course With ID: ' + id);
        }
    }
    
}
