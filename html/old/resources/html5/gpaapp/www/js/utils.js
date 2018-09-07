function toStr(input){
    var output;
    if (typeof input !== 'string'){
        //input is not a string, check to see if its an object, if it is stringify it
        console.log('UserData is not an object');
        if (typeof input == 'object'){
            if (testing){console.log('input is an object, stringifying it...');};
            output = JSON.stringify(input);
        }else{
            //input is not a string, log an error and return false
            if (testing){console.log('ERROR: user data is not an object...');};
            return false;
        }    
    }else{
        return output;
    }
}
function toObj(input){
    var output;
    if (typeof input !== 'object'){
        //input is not an object, check to see if its a string, if it is parse it
        if (typeof input == 'string'){
            if (testing){console.log('input is a string, parsing it...');};
            output = JSON.parse(input);
        }else{
            //input is not a string, log an error and return false
            if (testing){console.log('ERROR: user data is not a string...');};
            return false;
        }    
    }else{
        //input is allready an object, return it
        return output;
    }
}

function createTestData(userData){
    var userData = userData == null ? {} : userData;
    if (!userData.terms){
        userData.terms = [];
    }
    for (var i=0;i<10;i++){
        var term = {termName: "TermName" + i, termSDate: moment(1223234234).unix(), termEDate: moment(827834895).unix(), termType: "semester", termId: Math.uuid(), dateModified:moment().unix(), courses:[]};
        var ST =  moment();
        for (var c=0;c<5;c++){
            var course = {courseName: "course" + i, instructor: "mrs. k", credits: 3, tPts: 50, sPts:i*2, courseId: Math.uuid(), dateModified: moment().unix(), assigns:[]};
            for (var a=0;a<5;a++){
                var assignment = {
                    assignName: "assignment"+i,
                    assignId: Math.uuid(),
                    dueDate: moment(827834895).unix(),
                    tPts: i*5,
                    sPts:i*4,
                    weight: .2,
                    dateModified: moment().unix(), 
                    notes: 'this is an assignment'
                };
                course.assigns.push(assignment);
            }
            term.courses.push(course);
        }
        userData.terms.push(term);
    };
    var ET = moment();
    //console.log(ET.diff(ST) + '    ' + JSON.stringify(userData));
    console.log('TestData Created! took ' + ET.diff(ST) + 'ms');
    return userData;
    
}

function timer(callback, delay) {
    var id, started, remaining = delay, running;

    this.start = function() {
        running = true;
        started = new Date();
        id = setTimeout(callback, remaining);
    }

    this.pause = function() {
        running = false;
        clearTimeout(id);
        remaining -= new Date() - started;
    }

    this.getTimeLeft = function() {
        if (running) {
            this.pause();
            this.start();
        }

        return remaining;
    }

    this.getStateRunning = function() {
        return running;
    }

    this.start();
}

Handlebars.registerHelper('momentDate', function(text) {
    return moment(this).format("ddd, MMM Do");
});