// create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.post('/comments', (req, res) => {
    const comment = req.body.comment;
    fs.appendFile('comments.txt', comment + '\n', (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).send('Created');
        }
    });
});

app.get('/comments', (req, res) => {
    fs.readFile('comments.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running');
});