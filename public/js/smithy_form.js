'use strict'
var React = require('react');
const SmithyForm = React.createClass({
  handleSubmit : function(event) {
    event.preventDefault();

    this.props.getSynonyms({ data: this.refs.tweet.value });
  },

  render : function() {
    return (
      <form className="smithyForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="tweet" ref="tweet" />
        <button>smithy</button>
      </form>
    );
  }
})

module.exports = SmithyForm;
