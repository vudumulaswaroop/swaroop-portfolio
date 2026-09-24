import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio and updates the mouse spotlight', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Swaroop Reddy Vudumula' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument();
  expect(document.title).toContain('Swaroop Reddy Vudumula');

  const spotlight = document.querySelector('.mouse-spotlight');
  expect(spotlight).toHaveStyle({
    background: expect.stringContaining('0px 0px'),
  });

  fireEvent.mouseMove(window, { clientX: 120, clientY: 240 });

  expect(spotlight).toHaveStyle({
    background: expect.stringContaining('120px 240px'),
  });
});
