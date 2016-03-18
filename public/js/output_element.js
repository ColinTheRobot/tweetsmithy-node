'use strict'
var React = require('react');

const OutputElement = React.createClass({
  render : function() {
    var value = this.props.data
    var count = 140 - this.props.data.length;
    var pStyle = {display: 'inline', fontSize: '8px', verticalAlign: 'bottom' }

    return (
      <div>
        <p className="output"> {value} </p>

        {count !== 140 ? (
          <p style={pStyle}> {count} </p>
        ) : (
          <p style={pStyle}></p>
        )}
      </div>
    );
  }
})

module.exports = OutputElement;
