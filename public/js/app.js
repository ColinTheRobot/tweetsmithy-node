'use strict'

const Smithy = React.createClass({
  dsiplayName: "Smithy",

  getInitialState: function() {
    return { data: []};
  },

  handleSubmit: function(data) {
    $.get('/get-synonyms', { data: data.data }).done(function(data) {
      this.setState({ data: data})
    }.bind(this));
  },

  render: function() {
    return (
      <div className="smithy">
        <h1>Craft Tweet</h1>
        <SmithyForm onSubmit={this.handleSubmit} />
        <Results data={this.state.data} />
      </div>
    )
  }
})

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
    var tweet = this.state.value.trim();
    this.props.onSubmit({ data: tweet });

    this.setState({value: ''});
  },

  render: function() {
    var placeholder = this.state.placeholder;
    var value = this.state.value;
    return (
      <form className="smithyForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder={placeholder} value={value} onChange={this.handleChange} />
        <button>smithy</button>
      </form>
    );
  }
})

const Results = React.createClass({
  render: function() {
    debugger
    var synonyms = this.props.data.map(function(word) {
      var drilledSynonyms = word.words.map(function(syn) {

        return (
            <div className="results">
              <h4 className={syn}>
                {syn}
              </h4>
            </div>
        );
      })

      return drilledSynonyms
    });

    return (
      <div className="synonymList">
        {synonyms}
      </div>
    );
  }
});

ReactDOM.render(<Smithy />, document.getElementsByClassName('container')[0])
