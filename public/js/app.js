'use strict'
const SmithyForm = React.createClass({
  displayName: "SmithyForm",

  getInitialState: function() {
    return { placeholder: "tweet", value: "" };
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.setState({value: ''});
    $.post('/test', { data: this.state.value }).done(function(data) {
      console.log(data)
    });
  },

  render: function() {
    var placeholder = this.state.placeholder;
    var value = this.state.value;
    return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder={placeholder} value={value} onChange={this.handleChange} />
          <button> smithy</button>
        </form>
    );
  }
})

ReactDOM.render(<SmithyForm />, document.body )
