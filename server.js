'use strict';
const express = require('express');
const request = require('request');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.load();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'))

app.get('/', (req, res) => {
});

app.get('/test', (req, res) => {
  var url = `http://api.wordnik.com:80/v4/word.json/${req.query.data}/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=${process.env.WORDNIK_API_KEY}`
  request(url, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      console.log(body)
    }
    res.send(body)
  })
});

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;
});
