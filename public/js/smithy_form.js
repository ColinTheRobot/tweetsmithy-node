'use strict'
var React = require('react');

const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');

const SmithyForm = React.createClass({
  getInitialState : function() {
    return {
      textFieldValue : '',
      max_chars : 140,
      chars_left : 140
    }
  },

  handleSubmit : function(event) {
    event.preventDefault();

    this.props.getSynonyms({ data: this.state.textFieldValue });
  },

  _handleTextFieldChange : function(event) {
    this.setState({
      textFieldValue: event.target.value,
      chars_left: this.state.max_chars - event.target.value.length
    })
  },

  render : function() {
    var buttonStyle = { marginLeft: "25px", marginBottom: "10px"  }
    var textFieldStyle = { display: "inline-block",  width: "460px", verticalAlign: "bottom"}
    var pStyle = { display: 'inline-block', fontSize: '8px', verticalAlign: 'bottom' }

    return (
      <form className="smithyForm" >
        <TextField style={textFieldStyle} multiLine={true} value={this.state.textFieldValue} onChange={this._handleTextFieldChange} placeholder="craft tweet" />
        <p style={pStyle}> {this.state.chars_left}</p>
        <RaisedButton label="Smithy" style={buttonStyle} onClick={this.handleSubmit} />
      </form>
    );
  }
})

module.exports = SmithyForm;
