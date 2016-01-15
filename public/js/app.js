'use strict'

const Smithy = React.createClass({
  displayName: "Smithy",

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

const SynonymElement = React.createClass({
  render: function() {
    return (
        <li>{this.props.data}</li>
    )
  }
})

const Results = React.createClass({
  render: function() {
    var words = this.props.data;

    return (
        <div className="results">
        {
          Object.keys(words).map(function(value) {
            return (
              <div className={value}>
                <h4>{ value }</h4>
                  <ul>
                  {
                    words[value].map(function(syn) {
                      return <SynonymElement data={syn} />
                    })
                  }
                  </ul>
              </div>
            )
          })
        }
      </div>
    )
  }
})

ReactDOM.render(<Smithy />, document.getElementsByClassName('container')[0])
