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
  const previousAuthor = screen.getByTestId('author').textContent;
  const newQuoteButton = screen.getByRole('button', {name: "New Quote"});

  await userEvent.click(newQuoteButton);

  const actualPhrase = screen.getByTestId('phrase').textContent;
  const actualAuthor = screen.getByTestId('author').textContent;

  expect(actualPhrase).not.toEqual(previousPhrase);
  expect(actualAuthor).not.toEqual(previousAuthor);
});



//it should open a window to tweet

//await user.click(screen.getByRole('button', {name: /click me!/i}))
//screen.getByRole('link');
//screen.getByRole('button', {name: "New Quote"});
//screen.getByTestId('tweet-button');



//todo refactor without getByTestId
//todo merge text and author in one component
