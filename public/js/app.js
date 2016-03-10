'use strict'


const App = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      tweet: '',
      selectedSynonyms: {}
    };
  },

  swapWord : function(synonym, keyWord) {
    var currentWord = this.state.selectedSynonyms[keyWord];
    var tweet = this.state.tweet;
    var newTweet;

    if (!currentWord) {
      newTweet = tweet.replace(keyWord, synonym)
    } else {
      newTweet = tweet.replace(this.state.selectedSynonyms[keyWord], synonym)
    }

    this.state.selectedSynonyms[keyWord] = synonym;

    this.setState({
      selectedSynonyms : this.state.selectedSynonyms,
      tweet: newTweet
    })
  },

  getSynonyms: function(data) {
    this.setState({ tweet: data.data })

    $.get('/get-synonyms', { data: data.data })
      .done( (data) => {
      this.setState({ data: data})
    });
  },

  render: function() {
    return (
      <div className="smithy">
        <h1>Craft Tweet</h1>
        <OutputElement data={this.state.tweet} />
        <SmithyForm getSynonyms={this.getSynonyms} />
        <Results data={this.state.data} swapWord={this.swapWord} />
      </div>
    )
  }
})

const SmithyForm = React.createClass({
  handleSubmit : function(event) {
    event.preventDefault();

    this.props.getSynonyms({ data: this.refs.tweet.value });
  },

  render : function() {
    return (
      <form className="smithyForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="tweet" ref="tweet" />
        <button>smithy</button>
      </form>
    );
  }
})

const OutputElement = React.createClass({
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
    var style = {cursor: "alias", marginBottom: "10px"}
    return (
       <li style={style} onClick={this.replace}>{this.props.data}: {this.props.data.length}</li>
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
    var index = this.props.index;
    var word = Object.keys(this.props.synonyms)[0];
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

ReactDOM.render(<App />, document.getElementsByClassName('container')[0])
