'use strict';
const express = require('express');
const request = require('request');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const _ = require('underscore');
dotenv.load();

// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'))

const Promise = require('./promise.js')

app.get('/', (req, res) => {
});

app.get('/get-synonyms', (req, res) => {
  var tweetWords = sanitizeTweet(req.query.data);

  getDefs(tweetWords)
    .then(function(result) {
      res.send(result)
    });
});

var getDefs = function(tweetWords) {
  return new Promise(function(resolve) {
    var i = 0;
    var serialized = {};

    tweetWords.forEach(function(word) {
      wordnikClient(word, function(body) {
        var word = tweetWords[i];
        var shortenedWords = [];
        i++

        if (body[0]) {
          console.log(body)
         shortenedWords = _.filter(body, function(syn) {
           return syn.length < word.length
          })
          serialized[word] = shortenedWords
        }

        if (tweetWords.length == i) {
          resolve(serialized)
        }
      });
    })
  })
}

var sanitizeTweet = function(tweet) {
  var downcasedString = tweet.toLowerCase();
  var punctuationless = downcasedString.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  var finalString = punctuationless.replace(/\s{2,}/g," ");
  return finalString.split(' ')
}

var wordnikClient = function(word, callback) {
  var url = `http://api.wordnik.com:80/v4/word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=${process.env.WORDNIK_API_KEY}`
  request(url, (err, response, body) => {
    if (!err && response.statusCode == 200 && response.body != '[]') {
      callback(JSON.parse(body)[0].words)
    } else if (!err && response.statusCode == 200 && response.body == '[]') {
      callback([false])
    }
  })
}

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;
});
