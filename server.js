'use strict';
const express = require('express');
const request = require('request');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const _ = require('underscore');

dotenv.load();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'))
// app.use('/scripts', express.static(__dirname + './node_modules/react/'));
// app.use('/scripts', express.static(__dirname + './node_modules/react-dom/'));


// const Promise = require('./promise.js')

app.get('/', (req, res) => {
});

app.get('/get-synonyms', (req, res) => {
  var tweetWords = sanitizeTweet(req.query.data);
  getDefs(tweetWords, res)
});

var getDefs = function(tweetWords, res) {
  var i = 0;
  var serialized = {};
  var tweetWords = tweetWords || ['a']

  Promise.all(tweetWords.map((word) => wordnikClient(word, wordnikCallback)))
    .then(serialized => res.send(serialized))
    .catch(err => res.status(500).send('wattt'))
}

var wordnikCallback = function(word, body) {
  var shortenedWords = [];
  var serialized = {};

  if (body[0]) {
   shortenedWords = _.filter(body, (syn) => {
     return syn.length < word.length
   });
    serialized[word] = shortenedWords
  }
  return serialized
};

var sanitizeTweet = function(tweet) {
  var downcasedString = tweet.toLowerCase();
  var punctuationless = downcasedString.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  var finalString = punctuationless.replace(/\s{2,}/g," ");
  return finalString.split(' ')
}

var wordnikClient = function(word, callback) {
  var url = `http://api.wordnik.com:80/v4/word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=${process.env.WORDNIK_API_KEY}`

  return new Promise( (resolve, reject) => {
        request(url, (err, response, body) => {
          if (!err && response.statusCode == 200 && response.body != '[]') {
              // console.log(JSON.parse(body))
              // console.log(word)
              resolve(callback(word, JSON.parse(body)[0].words));
          } else if (!err && response.statusCode == 200 && response.body == '[]') {
              reject([false]);
          }
      });
  });
};

var port = process.env.PORT || 3000;

var server = app.listen(port);
