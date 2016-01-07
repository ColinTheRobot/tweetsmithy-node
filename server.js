'use strict';
const express = require('express');
const request = require('request');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'))

app.get('/', (req, res) => {
});

app.post('/test', (req, res) => {
  res.send(req.body.data)
});

// regex to strip punctuation
// convert words to array
// send each word to wordnik for synonym 


var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;
});
