var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

app.get('/', function (request, response) {

    // TODO: Initialize the query variable with a SQL query
    // that returns all the rows in the ‘store’ table
    var query = 'select * from songs order by votes desc, addedwhen asc, description asc;';
    db.any(query)
        .then(function (rows) {
            // render views/store/list.ejs template file
            response.render('pool/list', {
                title: 'Current Queue',
                data: rows
            })
        })
        .catch(function (err) {
            // display error message in case an error
            request.flash('error', err);
            response.render('pool/list', {
                title: 'Current Queue',
                data: ''
            })
        })
});

app.get('/add', function (request, response) {
    // render views/store/add.ejs
    response.render('pool/add', {
        title: 'Add New Song',
        description: ''
        //sname: '',
        //qty: '',
        //price: ''
    })
});

// Route to insert values. Notice that request method is POST here
app.post('/add', function (request, response) {
    // Validate user input - ensure non emptiness
    request.assert('description', 'description is required').notEmpty();
    //request.assert('sname', 'sname is required').notEmpty();
    //request.assert('qty', 'Quantity is required').notEmpty();
    //request.assert('price', 'Price is required').notEmpty();

    var errors = request.validationErrors();
    if (!errors) { // No validation errors
        var /*item*/song = {
            // sanitize() is a function used to prevent Hackers from inserting
            // malicious code(as data) into our database. There by preventing
            // SQL-injection attacks.
            description: request.sanitize('description').escape().trim(),
            //sname: request.sanitize('sname').escape().trim(),
            //qty: request.sanitize('qty').escape().trim(),
            //price: request.sanitize('price').escape().trim()
        };
        // Running SQL query to insert data into the store table
        db.none('INSERT INTO songs(description, ytlink, votes, addedwhen) VALUES($1, $2, $3, $4)', [song.description, 'use youtube video id to link to stuff Will did', 0, 'now()'/*item.sname, item.qty, item.price*/])
            .then(function (result) {
                request.flash('success', 'Data added successfully!');
                // render views/store/add.ejs
                response.render('pool/add', {
                    title: 'Add New Song',
                    description: ''
                    //sname: '',
                    //qty: '',
                    //price: ''
                })
            }).catch(function (err) {
            request.flash('error', err);
            // render views/store/add.ejs
            response.render('pool/add', {
                title: 'Add New Song',
                description: song.description
                //sname: item.sname,
                //qty: item.qty,
                //price: item.price
            })
        })
    } else {
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        request.flash('error', error_msg);
        response.render('pool/add', {
            title: 'Add New Item',
            description: request.body.description
            //sname: request.body.sname,
            //qty: request.body.qty,
            //price: request.body.price
        })
    }
});

// Route to delete an item. Notice that request method is DELETE here
app.delete('/delete/(:id)', function (req, res) {
    // Fetch item id of the item to be deleted from the request.
    var itemId = req.params.id;

    // TODO: Initialize the deleteQuery variable with a SQL query
    // that deletes an item whose id = itemId in the
    // 'store' table
    var deleteQuery = 'delete from songs where id = ' + itemId + ';';
    db.none(deleteQuery)
        .then(function (result) {
                  req.flash('success', 'successfully deleted it');
                  res.redirect('/pool');
        })
        .catch(function (err) {
                   req.flash('error', err);
                   res.redirect('/pool')
        })
    this.disabled = true;
});

// Route to delete an item. Notice that request method is DELETE here
app.delete('/upvote/(:id)', function (req, res) {
    // Fetch item id of the item to be deleted from the request.
    var itemId = req.params.id;

    // TODO: Initialize the deleteQuery variable with a SQL query
    // that deletes an item whose id = itemId in the
    // 'store' table
    var deleteQuery = 'update songs set votes = votes + 1 where id = ' + itemId + ';';
    db.none(deleteQuery)
        .then(function (result) {
                  req.flash('success', 'successfully deleted it');
                  res.redirect('/pool');
        })
        .catch(function (err) {
                   req.flash('error', err);
                   res.redirect('/pool')
        })
    this.disabled = true;
});

// Route to delete an item. Notice that request method is DELETE here
app.delete('/downvote/(:id)', function (req, res) {
    // Fetch item id of the item to be deleted from the request.
    var itemId = req.params.id;

    // TODO: Initialize the deleteQuery variable with a SQL query
    // that deletes an item whose id = itemId in the
    // 'store' table
    var deleteQuery = 'update songs set votes = votes - 1 where id = ' + itemId + ';';
    db.none(deleteQuery)
        .then(function (result) {
                  req.flash('success', 'successfully deleted it');
                  res.redirect('/pool');
        })
        .catch(function (err) {
                   req.flash('error', err);
                   res.redirect('/pool');
        })
});

app.get('/next-song', async function (request, response) {
    var query = 'select * from songs'

    let [ song ] = await db.any('SELECT * FROM songs ORDER BY votes DESC LIMIT 1');
    await db.any('DELETE FROM songs WHERE id = ' + song.id)
    response.json(song)
});