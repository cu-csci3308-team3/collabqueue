var express = require('express');
var querystring = require('querystring')
var got = require('got')
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
    response.redirect('/search.html')
});

// Route to insert values. Notice that request method is POST here
app.post('/add', async function (request, response) {
    var song = {
        id: request.sanitize('id').escape().trim(),
        title: request.sanitize('title').escape().trim(),
    }
    await db.none('INSERT INTO songs(description, ytlink, votes, addedwhen) VALUES($1, $2, $3, $4)', [song.title, song.id, 0, 'now()'])
    response.redirect('/pool')
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
    
    if (!song) {
        // if we don't have a song to play, return a rickroll
        song = { description: 'Never Gonna Give You Up', ytlink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
    } else {
        // if we do have a song to play, remove it from the queue
        await db.any('DELETE FROM songs WHERE id = ' + song.id)
    }

    response.json(song)
});

app.get('/search', async function (request, response) {
    let args = {
        key: global.API_KEY,
        videoEmbeddable: true,
        type: 'video',
        maxResults: 25,
        part: 'snippet',
        q: request.query.q
    }

    let url = 'https://www.googleapis.com/youtube/v3/search?' + querystring.stringify(args)
    let { body } = await got(url, { json: true })

    let results = body.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        image: item.snippet.thumbnails.default.url,
    }))

    response.json({ results });
});