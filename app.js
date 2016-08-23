
var log = require("debug")("demand-app");

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();


//var h = require("./lib/helpers.js")

//log(h.ensureAuthenticated)

//var config = require("./config");
//var tdxAPI = (new (require("nqm-api-tdx"))(config));





var routes = require('./routes/index');
var populationBuilder = require ('./routes/population-builder');
var populationDataPack = require ('./routes/population-datapack');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Initialise session
app.use(require("express-session")({ secret: "0928jkafja*()", resave: false, saveUninitialized: false }));


// set routes
app.use('/', routes);
app.use('/population-datapack', populationDataPack)
app.use('/population-builder', populationBuilder);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

app.listen(3000, function () {
    //console.log('Example app listening on port 3000!');
    log('Example app listening on port 3000!');
});
