// Lab 9 - Alex Book partnered with Bing Mitchell

var express = require('express');
var app = express();
var { prompt } = require('enquirer')
app.set('view engine', 'ejs');
var expressValidator = require('express-validator');
app.use(expressValidator());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'))

var methodOverride = require('method-override');
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser('csci3308'));
app.use(session({
    secret: 'csci3308',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));
app.use(flash());
// PAY ATTENTION TO THESE 4 LINES
var index = require('./routes/index');
var pool = require('./routes/pool');
app.use('/', index);
app.use('/pool', pool);
// THE 4 LINES ABOVE THIS
var port = 4000;

(async function main() {
    let { key } = await prompt({
        type: 'input',
        name: 'key',
        message: 'Enter YouTube API Key: ',
        validate: key => key.length != 39 ? "That doesn't look like a YouTube API Key" : true
    })
    global.API_KEY = key

    app.listen(port, function () {
        console.log('Server running on http://localhost:' + port)
    });
})()

