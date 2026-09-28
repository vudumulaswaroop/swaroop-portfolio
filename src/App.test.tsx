import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.useFakeTimers('modern');
});

afterEach(() => {
  jest.useRealTimers();
});

const setTime = (isoTime: string) => {
  jest.setSystemTime(new Date(isoTime));
};

const getAppShell = () => document.querySelector('.app-shell');

test.each([
  ['before 6 AM', '2024-01-01T00:29:00.000Z', true],
  ['at 6 AM', '2024-01-01T00:30:00.000Z', false],
  ['before 6 PM', '2024-01-01T12:29:00.000Z', false],
  ['at 6 PM', '2024-01-01T12:30:00.000Z', true],
])('uses India time for the night mode %s', (_label, isoTime, isNight) => {
  setTime(isoTime);
  render(<App />);

  if (isNight) {
    expect(getAppShell()).toHaveClass('night-mode');
    expect(document.body).toHaveClass('night-mode');
  } else {
    expect(getAppShell()).not.toHaveClass('night-mode');
    expect(document.body).not.toHaveClass('night-mode');
  }
});

test('updates night mode and spotlight as time and pointer change', () => {
  setTime('2024-01-01T00:29:59.000Z');
  const { unmount } = render(<App />);

  expect(screen.getByRole('heading', { name: 'Swaroop Reddy Vudumula' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument();
  expect(document.title).toContain('Swaroop Reddy Vudumula');

  const spotlight = document.querySelector('.mouse-spotlight');
  expect(spotlight).toHaveStyle({ background: 'none' });
  expect(spotlight).toHaveClass('night-moon');

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(getAppShell()).not.toHaveClass('night-mode');
  expect(document.body).not.toHaveClass('night-mode');

  fireEvent.mouseMove(window, { clientX: 120, clientY: 240 });

  expect(spotlight?.getAttribute('style')).toContain('--mouse-x: 120px');
  expect(spotlight?.getAttribute('style')).toContain('--mouse-y: 240px');

  unmount();
  expect(document.body).not.toHaveClass('night-mode');
  act(() => {
    jest.advanceTimersByTime(1000);
  });
});
