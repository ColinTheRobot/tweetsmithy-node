'use strict'
const SmithyForm = React.createClass({
  displayName: "SmithyForm",

  getInitialState: function() {
    return { value: "tweet" };
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  handleClick: function(event) {
    $.post('/test', { data: this.state.value }).done(function(data) {
      console.log(data)
    });
    event.preventDefault();
   },
  render: function() {
    var value = this.state.value;
    return (
        <form onSubmit={this.handleClick}>
          <input type="text" value={value} onChange={this.handleChange} />
          <button> smithy</button>
        </form>
    );
  }
})

ReactDOM.render(<SmithyForm />, document.body )
