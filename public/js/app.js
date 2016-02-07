'use strict'


const Smithy = React.createClass({
  displayName: 'Smithy',

  getInitialState: function() {
    return { data: [], tweet: '', selectedSynonyms: {}};
  },

  swapWord : function(synonym, keyWord) {
    this.state.selectedSynonyms[keyWord] = synonym;
    this.setState({selectedSynonyms : this.state.synonyms})

    var newTweet = this.state.tweet.replace(keyWord, synonym)
    this.setState({tweet: newTweet})
  },

  handleSubmit: function(data) {
    this.setState({ tweet: data.data })

    $.get('/get-synonyms', { data: data.data }).done(function(data) {
      this.setState({ data: data})
    }.bind(this));
  },

  render: function() {
    return (
      <div className="smithy">
        <h1>Craft Tweet</h1>
        <OutputElement data={this.state.tweet} />
        <SmithyForm onSubmit={this.handleSubmit} />
        <Results data={this.state.data} swapWord={this.swapWord} />
      </div>
    )
  }
})

const SmithyForm = React.createClass({
  displayName : "SmithyForm",

  getInitialState : function() {
    return { placeholder: "tweet", tweet: ''};
  },

  handleSubmit : function(event) {
    event.preventDefault();

    this.props.onSubmit({ data: this.refs.tweet.value });
  },

  render : function() {
    var placeholder = this.state.placeholder;

    return (
      <form className="smithyForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder={placeholder} ref="tweet" />
        <button>smithy</button>
      </form>
    );
  }
})

const OutputElement = React.createClass({
  getInitialSate : function() {
    return {
      value: ''
    }
  },

  render : function() {
    var value = this.props.data
    return (
        <p>{value}</p>
    );
  }
})


const SynonymElement = React.createClass({
  replace : function(event) {
    this.props.swapWord(this.props.data, this.props.keyWord )
  },

  render : function() {
    return (
      <li onClick={this.replace}>{this.props.data}: {this.props.data.length}</li>
    )
  }
})

const Results = React.createClass({
  render : function() {
    var words = this.props.data;
    var swapWord = this.props.swapWord
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
                      return <SynonymElement data={syn} keyWord={value} swapWord={swapWord} />
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
