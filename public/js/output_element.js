'use strict'
var React = require('react');
const OutputElement = React.createClass({
  render : function() {
    var value = this.props.data
    return (
        <p>{value}</p>
    );
  }
})

module.exports = OutputElement;
