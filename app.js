var testing = true;

var express         = require('express'),
    session         = require('express-session'),
    consolidate     = require('consolidate'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    serveStatic     = require('serve-static'),
	cors 			= require('cors');
    //initialize express
    var app = module.exports = express();

global.mode = process.env.NODE_ENV = "production";
global.testing = (global.mode == 'development');
//now load the logger
//set the app settings
app.set('port', 9000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine("html", consolidate.handlebars);

app.locals.pretty = true;

    app.use(bodyParser.json({ type: 'text/json', limit: '5mb' }));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cookieParser());
    app.use(serveStatic('./public'));


app.use(session({
    secret: "88v37g3m9sFwBx78Fy44J98243z28W",
    resave: false,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: null }
}));

app.use(cors());
/*
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials" , true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
*/
/*
    Initiate the routers
 */
//app.use('/', require('./modules/routes/router.js'));

//error handling
app.use(function(err, req, res, next){
    console.log(err.stack);
    // additional logic, like emailing OPS staff w/ stack trace
});
var server = app.listen(app.get('port'), function () {
    console.log("www.nickbolles.com server running in '" + global.mode + "' mode, listening on port " + app.get('port'));
});




