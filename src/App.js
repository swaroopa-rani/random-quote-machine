import React from 'react';
import './App.css';

const TWITTER_SHARE_URL = 'https://twitter.com/intent/tweet?text=';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      selectedQuote: { quote: '', author: '' },
      color: '',
    };
  }

  componentDidMount() {
    fetch(
      'https://gist.githubusercontent.com/shreyasminocha/7d5dedafc1fe158f82563c1223855177/raw/325d51aca7165b2498971afcff9bed286a52dc0e/quotes.json'
    )
      .then(quotes => quotes.json())
      .then(quotes => {
        const selectedQuote = this.selectRandomQuote(quotes);
        const randomColor = this.getRandomColor();
        this.setState({
          quotes,
          selectedQuote,
          color: randomColor,
        });
      });
  }

  randomIndexOfArray = arr => {
    return Math.floor(Math.random() * arr.length);
  };

  onClickNewQuote = () => {
    const { quotes } = this.state;
    const selectedQuote = this.selectRandomQuote(quotes);
    const randomColor = this.getRandomColor();
    this.setState({
      selectedQuote,
      color: randomColor,
    });
  };

  selectRandomQuote = quotes => {
    return quotes[this.randomIndexOfArray(quotes)];
  };

  getRandomColor = () => {
    const listOfColors = [
      'tan',
      'yellow',
      'orange',
      'red',
      'pink',
      'purple',
      'blue',
      'green',
      'brown',
      'grey',
      'violet',
      'cyan',
      'indigo',
    ];
    return listOfColors[this.randomIndexOfArray(listOfColors)];
  };

  shareTweet = () => {
    var { selectedQuote } = this.state;
    var tweetableQuote = `${selectedQuote.quote} - ${selectedQuote.author}`;
    window.open(TWITTER_SHARE_URL + encodeURIComponent(tweetableQuote));
  };

  render() {
    const { selectedQuote, color } = this.state;
    return (
      <div style={{ backgroundColor: color }} className="root">
        <div id="quote-box" className="quoteBox">
          <p id="text" className="textStyle" style={{ color }}>
            {selectedQuote.quote}
          </p>
          <p id="author" className="textStyle" style={{ color }}>
            {` - ${selectedQuote.author}`}
          </p>
          <button
            id="new-quote"
            className="buttonStyle"
            onClick={this.onClickNewQuote}
            style={{ backgroundColor: color }}
          >
            New quote
          </button>
          <button
            className="buttonStyle"
            style={{ backgroundColor: color }}
            onClick={this.shareTweet}
          >
            <a
              className="twitter-share-button"
              href="https://twitter.com/intent/tweet"
              target="_blank"
              id="tweet-quote"
            >
              Tweet
            </a>
          </button>
        </div>
      </div>
    );
  }
}
