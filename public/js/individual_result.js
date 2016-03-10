'use strict'
var React = require('react');
const SynonymElement = require('./synonym_element');

const IndividualResult = React.createClass({
  renderSynElements : function(syn) {
    var swapWord = this.props.swapWord;
    var word = Object.keys(this.props.synonyms)[0];

    return <SynonymElement data={syn} keyWord={word} swapWord={swapWord} />
  },

  render : function() {
    var index = this.props.index;
    var word = Object.keys(this.props.synonyms)[0];
    var synonyms = this.props.synonyms[word];

    return (
      <div className={index}>
        <h4>{word}</h4>
          <ul>
          {
            synonyms.map(this.renderSynElements)
          }
          </ul>
      </div>
    )
  }
})

module.exports = IndividualResult;
