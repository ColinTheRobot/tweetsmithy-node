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
    // debugger
    this.props.swapWord(this.props.data, this.props.keyWord )
  },

  render : function() {
    // console.log(this.props)
    return (
       <li onClick={this.replace}>{this.props.data}: {this.props.data.length}</li>
    )
  }
})


const IndividualResult = React.createClass({
  renderSynElements : function(syn) {
    var swapWord = this.props.swapWord;
    var word = Object.keys(this.props.synonyms)[0];

    return <SynonymElement data={syn} keyWord={word} swapWord={swapWord} />
  },

  render : function() {
    // var swapWord = this.props.swapWord;
    var index = this.props.index;
    var word = Object.keys(this.props.synonyms)[0];
    // debugger
    var synonyms = this.props.synonyms[word];

    return (
      <div className={index}>
        <h4>{word}</h4>
          <ul>
          {
            synonyms.map(this.renderSynElements)
          }
          </ul>
      </div>
    )
  }
})


const Results = React.createClass({
  renderIndividualResults : function(key) {
    return <IndividualResult key={key} index={key} synonyms={this.props.data[key]} swapWord={this.props.swapWord} />
  },
  render : function() {
    var words = this.props.data;
    return (
        <div className="results">
        {
          Object.keys(words).map(this.renderIndividualResults)
        }
        </div>
    )
  }
})

ReactDOM.render(<Smithy />, document.getElementsByClassName('container')[0])
