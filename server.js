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

app.get('/get-synonyms', (req, res) => {
  var tweetWords = sanitizeTweet(req.query.data);
  var serialized = {};
  var i = 0;

  tweetWords.forEach(function(word) {
    var response = wordnikClient(word, function(body) {
      console.log(i)
      serialized[tweetWords[i]] = body
      console.log(serialized)
      i++
    });
  })
});

var sanitizeTweet = function(tweet) {
  var punctuationless = tweet.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  var finalString = punctuationless.replace(/\s{2,}/g," ");
  return finalString.split(' ')
}

var wordnikClient = function(word, callback) {
  var url = `http://api.wordnik.com:80/v4/word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=${process.env.WORDNIK_API_KEY}`
  request(url, (err, response, body) => {
    if (!err && response.statusCode == 200) {
     // console.log(JSON.parse(body))
     callback(JSON.parse(body)[0].words)
    }
  })
}

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;
});
