var express = require('express');
var app = express();

app.get('/', function (request, response) {
   // render the views/index.ejs template file
   response.render('index', {title: 'Welcome to Jampool'})
});

module.exports = app;

/*

user@cu-cs-vm:~$ cd Desktop/AllFiles/CSCI3308/project/mockLab9/lab9/
user@cu-cs-vm:~/Desktop/AllFiles/CSCI3308/project/mockLab9/lab9$ node server.js

*/