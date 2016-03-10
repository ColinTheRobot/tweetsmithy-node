'use strict'
var React = require('react');
const IndividualResult = require('./individual_result');

const Results = React.createClass({
  renderIndividualResults : function(key) {
    return <IndividualResult key={key} index={key} synonyms={this.props.data[key]} swapWord={this.props.swapWord} />
  },

  render : function() {
    var words = this.props.data;
    return (
        <div className="results">
        {
          Object.keys(words).map(this.renderIndividualResults)
        }
        </div>
    )
  }
})

module.exports = Results;
