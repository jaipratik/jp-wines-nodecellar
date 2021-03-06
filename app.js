
var express = require('express'),
    path = require('path'),
    http = require('http'),
    wine = require('./routes/wines');

    

var app = express();


 console.log( 'currentEnv (in App.js) ', app.settings.env);

app.configure( 'development', function (){
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});


app.configure( 'production', function (){
    app.set('port', process.env.PORT || 3080);
    app.use(express.logger('prod'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.errorHandler()); 
});



app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);


http.createServer(app).listen(app.get('port'), function () {
    // console.log("Express server listening on port " + app.get('port'));
    console.log("Express server listening on port %d in %s mode", app.settings.port, app.settings.env);
});


