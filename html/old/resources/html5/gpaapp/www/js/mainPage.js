Handlebars.registerHelper('log', function(text) {
    console.log('Object is: ' + JSON.stringify(text));
    console.log('this is: ' + JSON.stringify(this));
  //return new Handlebars.SafeString(result);
});


var mainPage = {
    //initialize the page, load the template, insert content and send it to the Show Method
    initialize: function(){
        console.log('INITIALIZING MAINPAGE');
        $('#menutrigger').css("display", "block");
        this.renderPage();
    },
    renderPage: function(){
        var context;
        if (_userData == {}){
            console.log('USER DATA IS AN EMPTY OBJECT ' + JSON.stringify(_userData));
            context = {};
        }else{
            context = _userData;
        }
        context.header = app.settings.mainPage.header;
        Handlebars.registerPartial("termItem", templateLoader.html("termItem"));
        var mainPageTemplate = Handlebars.compile(templateLoader.html("mainPage"));
        var mainPageHTML = $.parseHTML(mainPageTemplate(context));
        $('.activePage').remove();
        $('#app').append(mainPageHTML);
        app.resize();
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        mainPage.termScroll = new IScroll('#termListWrapper', {
            mouseWheel: true,
            scrollbars: true
        });
        
        //Bind the events after the page is finished loading
        this.bindEvents();
    },
    bindEvents:function(){
        //bind the wrapper to the click event, because of event bubbling
        //this will be thrown and in the handler find which item was clicked
        $('.termListWrapper').on('click', '.termItem', this.onTermItemClick);
    },
    onTermItemClick:function(event){
        var clicked= this;
        var id = clicked.dataset.termid;
        console.log('Id is ' + id);
        _currentTerm = findTermById(id);
        console.log(_currentTerm);
        termPage.initialize();
    }
    
}
