import './App.css';
import { useState, useEffect } from 'react';


const QUOTES = [
  {"id":0,"phrase":"L'homme est un loup pour l'homme.","author":"Plaute"},
  {"id":1,"phrase":"Il m'a fait trop de bien pour en dire du mal, - Il m'a fait trop de mal pour en dire du bien.","author":"Pierre Corneille"},
  {"id":2,"phrase":"Rien de grand ne s'est accompli dans le monde sans passion.","author":"Georg Wilhelm Friedrich Hegel"},
  {"id":3,"phrase":"On n'est pas sérieux, quand on a dix-sept ans.","author":"Arthur Rimbaud"},
  {"id":4,"phrase":"Science sans conscience n'est que ruine de l'âme.","author":"François Rabelais"},
  {"id":5,"phrase":"Il y a deux histoires : l'histoire officielle, menteuse, qu’on enseigne, puis l'Histoire secrète, où sont les véritables causes des événements.","author":"Balzac"},
  {"id":6,"phrase":"Familles! je vous hais! Foyers clos; portes refermées; possessions jalouses du bonheur.","author":"André Gide"},
  {"id":7,"phrase":"L'homme n'est pas né pour le repos.","author":"Voltaire"},
  {"id":8,"phrase":"Si j'ai vu si loin, c'est que j'étais monté sur des épaules de géants.","author":"Isaac Newton"},
  {"id":9,"phrase":"Ceux qui ne peuvent se souvenir du passé sont condamnés à le répéter.","author":"George Santayana"},
  {"id":10,"phrase":"J'ai le rêve qu'un jour mes quatre enfants vivront dans une nation où ils ne seront pas jugés pour la couleur de leur peau, mais pour leur caractère.","author":"Martin Luther King"},
  {"id":11,"phrase":"Il n'y a point de pires sourds que ceux qui ne veulent pas entendre.","author":"Molière"},
  {"id":12,"phrase":"Si ceux qui disent du mal de moi savaient exactement ce que je pense d'eux, ils en diraient bien davantage.","author":"Sacha Guitry"},
  {"id":13,"phrase":"Un problème sans solution est un problème mal posé.","author":"Albert Einstein"},
  {"id":14,"phrase":"Le courage n'est pas l'absence de peur, mais la capacité de vaincre ce qui fait peur.","author":"Nelson Mandela"},
  {"id":15,"phrase":"Vis comme si tu devais mourir demain. Apprends comme si tu devais vivre toujours.","author":"Mahatma Gandhi"},
  {"id":16,"phrase":"Le souvenir est le parfum de l'âme.","author":"George Sand"},
  {"id":17,"phrase":"L'enfer c’est les autres.","author":"Sartre"},
  {"id":18,"phrase":"La vie sans musique est tout simplement une erreur, une torture, un exil.","author":"Friedrich Wilhelm Nietzsche"},
  {"id":19,"phrase":"Ce qui compte, chez un homme, ce n'est pas la couleur de sa peau ou la texture de sa chevelure, mais la texture et la qualité de son âme.","author":"Martin Luther King"}
];
const COLORS = [
  'LightSlateGray',
  'CadetBlue',
  'DarkSeaGreen',
  'SteelBlue',
  'OliveDrab',
  'MediumPurple',
  'MidnightBlue',
  'FireBrick'
];

export default function App() {
  return <QuoteBox />;
}

function QuoteBox() {
  const randomQuoteId = Math.floor(Math.random() * QUOTES.length);
  const randomQuote = QUOTES[randomQuoteId];

  const [quote,setQuote] = useState(randomQuote);
  const [color,setColor] = useState('FireBrick');

  useEffect(() => {
   document.documentElement.style.setProperty('--main-color',color);
  },[color]);

  function updateScreen() {
    setQuote(generateRandomQuote());
    setColor(generateRandomColor());
  }

  function generateRandomQuote() {
    let randomQuoteId = Math.floor(Math.random() * QUOTES.length);

    while(randomQuoteId === quote.id){
      randomQuoteId = Math.floor(Math.random() * QUOTES.length);
    }
    return QUOTES[randomQuoteId];
  }

  function generateRandomColor() {
    let randomColorId = Math.floor(Math.random() * COLORS.length);
    let randomColor = COLORS[randomColorId];

    while (randomColor === color){
      randomColorId = Math.floor(Math.random() * COLORS.length);
      randomColor = COLORS[randomColorId];
    }
    return randomColor;
  }

  return (
    <>
      <div id="title">Quote Machine</div>
      <div id="quote-box">
        <Quote phrase={quote.phrase} author={quote.author}/>
        <div id="buttons">
          <TweetButton phrase={quote.phrase} author={quote.author}/>
          <NewQuoteButton onClick={updateScreen} />
        </div>
      </div>
    </>
  );

}

function Quote({ phrase, author }){
  return (
    <>
      <div id="phrase" data-testid="phrase">
        {phrase}
      </div>
      <div id="author" data-testid="author">
        {author}
      </div>
    </>
  );
}

function TweetButton({ phrase, author }){

  const formattedPhraseForTweet = '"' + phrase + '" (' + author + ')';
  const tweetLink = 'https://twitter.com/intent/tweet?text=' + formattedPhraseForTweet;

  return (
    <div id="twitter-button">
      <a className="button" href={tweetLink} id="tweet-quote" target="_blank" rel="noreferrer" title="Tweet this phrase">
        <span className="fa fa-twitter"/>
      </a>
    </div>
  );
}

function NewQuoteButton({ onClick }){
  return (
    <div id="new-quote-button">
      <button className="button" id="new-quote" onClick={onClick}>New Quote</button>
    </div>
  );
}
