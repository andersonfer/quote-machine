import './App.css';
import { Component } from 'react';

const PHRASES = [
  ['L\'homme est un loup pour l\'homme.','Plaute'],
['Il m\'a fait trop de bien pour en dire du mal, - Il m\'a fait trop de mal pour en dire du bien.','Pierre Corneille'],
['Rien de grand ne s\'est accompli dans le monde sans passion.','Georg Wilhelm Friedrich Hegel'],
['On n\'est pas sérieux, quand on a dix-sept ans.','Arthur Rimbaud'],
['Science sans conscience n\'est que ruine de l\'âme.','François Rabelais'],
['Il y a deux histoires : l\'histoire officielle, menteuse, qu’on enseigne, puis l\'Histoire secrète, où sont les véritables causes des événements.','Balzac'],
['Familles! je vous hais! Foyers clos; portes refermées; possessions jalouses du bonheur.','André Gide'],
['L\'homme n\'est pas né pour le repos.','Voltaire'],
['Si j\'ai vu si loin, c\'est que j\'étais monté sur des épaules de géants.','Isaac Newton'],
['Ceux qui ne peuvent se souvenir du passé sont condamnés à le répéter.','George Santayana'],
['J\'ai le rêve qu\'un jour mes quatre enfants vivront dans une nation où ils ne seront pas jugés pour la couleur de leur peau, mais pour leur caractère.','Martin Luther King'],
['Il n\'y a point de pires sourds que ceux qui ne veulent pas entendre.','Molière'],
['Si ceux qui disent du mal de moi savaient exactement ce que je pense d\'eux, ils en diraient bien davantage.','Sacha Guitry'],
['Un problème sans solution est un problème mal posé.','Albert Einstein'],
['Le courage n\'est pas l\'absence de peur, mais la capacité de vaincre ce qui fait peur.','Nelson Mandela'],
['Vis comme si tu devais mourir demain. Apprends comme si tu devais vivre toujours.','Mahatma Gandhi'],
['Le souvenir est le parfum de l\'âme.','George Sand'],
['L\'enfer c’est les autres.','Sartre'],
['La vie sans musique est tout simplement une erreur, une torture, un exil.','Friedrich Wilhelm Nietzsche'],
['Ce qui compte, chez un homme, ce n\'est pas la couleur de sa peau ou la texture de sa chevelure, mais la texture et la qualité de son âme.','Martin Luther King']
];
const COLORS = [
  'LightSlateGray',
  'CadetBlue',
  'DarkKhaki',
  'DarkSeaGreen',
  'SteelBlue',
  'OliveDrab',
  'MediumPurple',
  'MidnightBlue',
  'FireBrick'
];

class App extends Component {
  render() {
    return <QuoteBox />;
  }
}

class QuoteBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      author: '',
      phraseId:0,
      color:'FireBrick'
    }
  }

  componentDidMount = () => {
    this.updatePhrase();
    this.updateColor();
  }

  updatePhrase = () => {
    const phrase = this.generateRandomPhrase();

    this.setState({
      text:phrase.text,
      author:phrase.author,
      phraseId:phrase.id
    });
  };

  generateRandomPhrase = () => {
    let randomNumberForPhraseChoice;

    do{
      randomNumberForPhraseChoice = Math.floor(Math.random() * PHRASES.length);
    }
    while (randomNumberForPhraseChoice === this.state.phraseId);
    const [text,author] = PHRASES[randomNumberForPhraseChoice];
    return {
      text:text,
      author:author,
      id:randomNumberForPhraseChoice
    };
  }

  render() {
    return (
      <>
        <div id="title">Quote Machine</div>
        <div id="quote-box">
          <Phrase text={this.state.text} author={this.state.author}/>
          <div id="buttons">
            <TweetButton text={this.state.text} author={this.state.author}/>
            <NewQuoteButton updateFnc={this.updateScreen} />
          </div>
        </div>
      </>
    );
  }

  updateScreen = () => {
    this.updatePhrase();
    this.updateColor();
  }

  updateColor = () => {
    const randomColor = this.generateRandomColor();

    this.setState({
      color:randomColor
    })
    document.documentElement.style.setProperty("--main-color", randomColor);
  };

  generateRandomColor = () => {
    let randomColor;

    do{
      let randomNumberForColorChoice = Math.floor(Math.random() * COLORS.length);
      randomColor = COLORS[randomNumberForColorChoice];
    }
    while (randomColor === this.state.color);
    return randomColor;
  }
}

function Phrase({ text, author }){
  return (
    <>
      <div id="text" data-testid="phrase">
        {text}
      </div>
      <div id="author" data-testid="author">
        {author}
      </div>
    </>
  );
}

function TweetButton({ text, author }){

  const formattedPhraseForTweet = '"' + text + '" (' + author + ')';
  const tweetLink = 'https://twitter.com/intent/tweet?text=' + formattedPhraseForTweet;

  return (
    <div id="twitter-button">
      <a className="button" href={tweetLink} id="tweet-quote" target="_blank" rel="noreferrer" title="Tweet this phrase">
        <span className="fa fa-twitter"/>
      </a>
    </div>
  );
}


class NewQuoteButton extends Component {
  render() {
    return (
      <div id="new-quote-button">
        <button className="button" id="new-quote" onClick={this.props.updateFnc}>New Quote</button>
       </div>
    );
  }
}


export default App;
