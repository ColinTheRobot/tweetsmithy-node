'use strict'
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
// var $ = require('jquery');

const OutputElement =  require('./output_element')
const SmithyForm = require('./smithy_form')
const Results = require('./results')

const App = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      tweet: '',
      selectedSynonyms: {}
    };
  },

  swapWord : function(synonym, keyWord) {
    var currentWord = this.state.selectedSynonyms[keyWord];
    var tweet = this.state.tweet;
    var newTweet;

    if (!currentWord) {
      newTweet = tweet.replace(keyWord, synonym)
    } else {
      newTweet = tweet.replace(this.state.selectedSynonyms[keyWord], synonym)
    }

    this.state.selectedSynonyms[keyWord] = synonym;

    this.setState({
      selectedSynonyms : this.state.selectedSynonyms,
      tweet: newTweet
    })
  },

  getSynonyms: function(data) {
    this.setState({ tweet: data.data })

    $.get('/get-synonyms', { data: data.data })
      .done( (data) => {
      this.setState({ data: data})
    });
  },

  render: function() {
    return (
      <div className="smithy">
        <h1>Craft Tweet</h1>
        <OutputElement data={this.state.tweet} />
        <SmithyForm getSynonyms={this.getSynonyms} />
        <Results data={this.state.data} swapWord={this.swapWord} />
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('container'))
