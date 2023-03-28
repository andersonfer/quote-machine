import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';


it('should render properly', () => {
  render(<App />);

  screen.getByText(/quote machine/i);
  screen.getByTestId('phrase');
  screen.getByTestId('author');
  screen.getByRole('button', {name: "New Quote"});
  screen.getByRole('link', {name: /tweet this phrase/i});
});

it('should render a phrase on startup', () => {
  render(<App />);

  const letter_followed_by_anything_regex = /^[a-zA-Z].*$/;

  expect(screen.getByTestId('phrase'))
    .toHaveTextContent(letter_followed_by_anything_regex);
  expect(screen.getByTestId('author'))
    .toHaveTextContent(letter_followed_by_anything_regex);
});

it('should render a new phrase when the "New Quote" button is clicked', async () => {
  render(<App />);

  const previousPhrase = screen.getByTestId('phrase').textContent;
  const newQuoteButton = screen.getByRole('button', {name: "New Quote"});

  await userEvent.click(newQuoteButton);

  const actualPhrase = screen.getByTestId('phrase').textContent;
  expect(actualPhrase).not.toEqual(previousPhrase);
});

it('should change the background color when the "New Quote" button is clicked', async () => {
  render(<App />);

  const previousColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color');
  const newQuoteButton = screen.getByRole('button', {name: "New Quote"});

  await userEvent.click(newQuoteButton);

  const actualColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color');
  expect(actualColor).not.toEqual(previousColor);

});

it('should open a new window when the "Tweet" link is clicked', () => {
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
