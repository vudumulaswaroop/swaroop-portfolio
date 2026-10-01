import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import i18n from './i18n';

beforeEach(async () => {
  jest.useFakeTimers('modern');
  await i18n.changeLanguage('en-US');
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

// test('opens the language dialog and switches the portfolio to Hindi', async () => {
//   const { rerender } = render(<App />);

//   expect(screen.getByRole('dialog', { name: 'Choose a language' })).toBeInTheDocument();
//   expect(screen.getAllByRole('button', { name: /English/ })).toHaveLength(4);

//   fireEvent.change(screen.getByRole('searchbox', { name: 'Search languages' }), {
//     target: { value: 'hi-IN' },
//   });
//   fireEvent.click(screen.getByRole('button', { name: /Hindi hi-IN/ }));

//   expect(await screen.findByRole('heading', { name: 'मेरा तकनीकी दृष्टिकोण' })).toBeInTheDocument();
//   expect(screen.getByRole('heading', { name: 'संपर्क करें' })).toBeInTheDocument();
//   expect(screen.getByRole('link', { name: 'अनुभव' })).toHaveAttribute('href', '#experience');
//   expect(screen.getByPlaceholderText('आपका नाम')).toBeInTheDocument();
//   expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
//   expect(document.documentElement).toHaveAttribute('lang', 'hi-IN');
//   expect(document.title).toContain('स्वरूप रेड्डी वुडुमुला');
//   rerender(<App />);
//   expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
// });

// test.each([
//   ['en-GB', 'English (UK)', 'My Technology Philosophy', 'ltr'],
//   ['en-IN', 'English (India)', 'My Technology Philosophy', 'ltr'],
//   ['en-AE', 'English (UAE)', 'My Technology Philosophy', 'ltr'],
//   ['ar-AE', 'Arabic (UAE)', 'فلسفتي في التقنية', 'rtl'],
// ])('loads the %s locale', async (code, label, heading, direction) => {
//   render(<App />);
//   fireEvent.change(screen.getByRole('searchbox', { name: 'Search languages' }), {
//     target: { value: code },
//   });
//   fireEvent.click(screen.getByRole('button', { name: `${label} ${code}` }));

//   expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument();
//   expect(document.documentElement).toHaveAttribute('lang', code);
//   expect(document.documentElement).toHaveAttribute('dir', direction);
//   expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
// });

// test('filters locales and dismisses the language dialog', () => {
//   const firstMount = render(<App />);

//   const search = screen.getByRole('searchbox', { name: 'Search languages' });
//   fireEvent.change(search, { target: { value: 'no-such-language' } });
//   expect(screen.getByText('No languages found.')).toBeInTheDocument();

//   fireEvent.click(screen.getByRole('button', { name: 'Close language selector' }));
//   expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

//   firstMount.unmount();
//   const secondMount = render(<App />);
//   expect(screen.getByRole('dialog')).toBeInTheDocument();
//   fireEvent.mouseDown(screen.getByRole('dialog'));
//   expect(screen.getByRole('dialog')).toBeInTheDocument();
//   fireEvent.keyDown(window, { key: 'Enter' });
//   expect(screen.getByRole('dialog')).toBeInTheDocument();
//   fireEvent.keyDown(window, { key: 'Escape' });
//   expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

//   secondMount.unmount();
//   render(<App />);
//   const backdrop = document.querySelector('.language-dialog-backdrop') as Element;
//   fireEvent.mouseDown(backdrop, { target: backdrop });
//   expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
// });

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
