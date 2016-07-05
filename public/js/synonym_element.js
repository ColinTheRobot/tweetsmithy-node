'use strict'
var React = require('react');

const SynonymElement = React.createClass({
  replace : function(event) {
    this.props.swapWord(this.props.data, this.props.keyWord )
  },

  render : function() {
    var style = {cursor: "alias", marginBottom: "10px"}
    return (
       <li style={style} onClick={this.replace}>{this.props.data}</li>
    )
  }
})

module.exports = SynonymElement;
