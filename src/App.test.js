import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

const LETTER_FOLLOWED_BY_ANYTHING_REGEX = /\S.*/;

it('should render a phrase on startup', () => {
  render(<App />);

  expect(screen.getByTestId('phrase'))
    .toHaveTextContent(LETTER_FOLLOWED_BY_ANYTHING_REGEX);
  expect(screen.getByTestId('author'))
    .toHaveTextContent(LETTER_FOLLOWED_BY_ANYTHING_REGEX);
});


it('should render a new phrase when the "New Quote" button is clicked', async () => {
  render(<App />);

  const previousPhrase = screen.getByTestId('phrase').textContent;
  const previousColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color');

  const newQuoteButton = screen.getByRole('button', {name: "New Quote"});

  await userEvent.click(newQuoteButton);

  const actualPhrase = screen.getByTestId('phrase').textContent;
  const actualColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color');

  expect(actualPhrase).not.toEqual(previousPhrase);
  expect(actualColor).not.toEqual(previousColor);

});

it('should open a new window when the "Tweet" link is clicked', () => {
  //todo move it to the "render properly test"
  render(<App />);

  const tweetLink = screen.getByRole('link', {name: /tweet this phrase/i});

  expect(tweetLink.target).toBe('_blank');

});

test('the tweet link should have a phrase in its content', () => {
  render(<App />);

  const tweetLinkElement = screen.getByRole('link', {name: /tweet this phrase/i});
  const phraseToBeTweeted = extractPhraseFromHref(tweetLinkElement.href);
  /* this pattern searches for a string between quotation marks
  followed by a space and another string between parenthesis */
  const phraseFormatRegex = /"[a-zA-Z][^"]*"\s\([a-zA-Z][^\)]*\)/

  //todo check it against the actual phrase
  expect(phraseToBeTweeted).toMatch(phraseFormatRegex);

});


extractPhraseFromHref = (href) => {
  const decodedHref = decodeURIComponent(href);
  const twitterPrefix = "https://twitter.com/intent/tweet?text=";

  return decodedHref.substring(twitterPrefix.length);

}


//todo refactor without getByTestId -- create a should render properly test case
//todo merge text and author in one component
