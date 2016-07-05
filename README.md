# TweetSmithy

Uses the Wordnik API to return shorter synonyms for the words input into the smithy form.

Goal: Provide a UI for live tweeting that will ease the process of fitting tweets into the character limit by allowing the user to quickly swap words for shorter synonyms.

Not yet complete:

- Authentication with Twitter
- Ability to tweet after replacing words

Api limitations:

Wordnik API returns a 500 when it receives too many requests. TweetSmithy is unable to make requests for multiple words consecutively. As of yet there is no way to make batch requests for synonyms of multiple words.


Uses Node, Express, React, ES6 and Browserify
