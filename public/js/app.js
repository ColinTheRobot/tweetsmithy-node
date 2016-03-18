'use strict'
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

const OutputElement =  require('./output_element')
const SmithyForm = require('./smithy_form')
const Results = require('./results')

const AppBar = require('material-ui/lib/app-bar');

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
        <AppBar showMenuIconButton={false}/>
        <SmithyForm getSynonyms={this.getSynonyms} />
        <OutputElement data={this.state.tweet} />
        <Results data={this.state.data} swapWord={this.swapWord} />
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('container'))
