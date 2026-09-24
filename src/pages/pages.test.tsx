import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { About } from './about';
import { Experiences } from './experiences';
import { Projects } from './projects';
import { Navlinks } from './navlinks';
import { FallinngStarsEffect } from './fallinngStarsEffect';
import { Footerpage } from './footerpage';
import { SocialLinks } from './socialLinks';
import ContactUs from './contactUS';

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders the about, experience, projects, footer, social, and stars content', () => {
  const { container } = render(
    <>
      <About />
      <Experiences />
      <Projects />
      <Footerpage />
      <SocialLinks />
      <FallinngStarsEffect />
    </>,
  );

  expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
  expect(screen.getByText('Take a look of resume')).toHaveAttribute(
    'href',
    '/SwaroopReddyVudumulaResume.pdf',
  );
  expect(screen.getByText(/Built with/)).toHaveTextContent('ReactJS');
  expect(screen.getByLabelText('GitHub')).toHaveAttribute(
    'href',
    'https://github.com/vudumulaswaroop',
  );
  expect(container.querySelectorAll('.star')).toHaveLength(6);
  expect(container.querySelector('.star')).toHaveStyle({
    '--star-top': '10%',
    '--star-left': '80%',
  });
});

test('renders navigation and changes the active section while scrolling', () => {
  render(<Navlinks />);

  Object.defineProperty(document.documentElement, 'scrollHeight', {
    configurable: true,
    value: 2000,
  });
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 });
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 300 });
  fireEvent.scroll(window);

  const sectionData: Array<[string, number, number]> = [
    ['about', 0, 300],
    ['experience', 300, 300],
    ['projects', 700, 300],
    ['contactus', 1000, 300],
  ];

  sectionData.forEach(([id, top, height]) => {
    const section = document.createElement('section');
    section.id = id;
    Object.defineProperty(section, 'offsetTop', { configurable: true, value: top });
    Object.defineProperty(section, 'offsetHeight', { configurable: true, value: height });
    document.body.appendChild(section);
  });

  fireEvent.scroll(window);
  expect(screen.getByText('experience').closest('li')).toHaveClass('active');

  Object.defineProperty(window, 'scrollY', { configurable: true, value: 1200 });
  fireEvent.scroll(window);
  expect(screen.getByText('contactus').closest('li')).toHaveClass('active');
});

const fillRequiredContactFields = () => {
  fireEvent.change(screen.getByPlaceholderText('Your Name'), {
    target: { name: 'name', value: 'Test User' },
  });
  fireEvent.change(screen.getByPlaceholderText('Your Email'), {
    target: { name: 'email', value: 'test@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Your Message'), {
    target: { name: 'message', value: 'Hello' },
  });
};

test('sanitizes India and USA phone numbers and reports country-specific errors', () => {
  const { container } = render(<ContactUs />);
  const form = container.querySelector('form') as HTMLFormElement;
  const phone = screen.getByPlaceholderText('Phone Number');

  fireEvent.change(phone, { target: { name: 'phone', value: 'abc9876543210' } });
  expect(phone).toHaveValue('9876543210');
  fireEvent.change(phone, { target: { name: 'phone', value: '1111111111' } });
  fireEvent.submit(form);
  expect(screen.getByText('Please enter a valid 10-digit Indian mobile number.')).toBeInTheDocument();

  fireEvent.change(phone, { target: { name: 'phone', value: '5123456789' } });
  fireEvent.submit(form);
  expect(screen.getByText('Please enter a valid 10-digit Indian mobile number.')).toBeInTheDocument();

  fireEvent.click(screen.getByLabelText('USA (+1)'));
  const usaPhone = screen.getByPlaceholderText('Phone Number');
  fireEvent.change(usaPhone, { target: { name: 'phone', value: 'abc1234567890' } });
  expect(usaPhone).toHaveValue('1234567890');
  fireEvent.submit(form);
  expect(screen.getByText('Please enter a valid 10-digit US phone number.')).toBeInTheDocument();

  fireEvent.change(usaPhone, { target: { name: 'phone', value: '123456789' } });
  fireEvent.submit(form);
  expect(screen.getByText('Please enter a valid 10-digit US phone number.')).toBeInTheDocument();
});

test('validates international numbers and submits successfully', async () => {
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({} as Response);
  const { container } = render(<ContactUs />);
  const form = container.querySelector('form') as HTMLFormElement;

  fireEvent.click(screen.getByLabelText('Other'));
  const phone = screen.getByPlaceholderText('Phone Number (+447911123456)');
  fireEvent.change(phone, { target: { name: 'phone', value: 'abc++447911123456' } });
  expect(phone).toHaveValue('+447911123456');
  fillRequiredContactFields();
  fireEvent.submit(form);

  await waitFor(() => {
    expect(screen.getByText('Thank you! Your message has been sent.')).toBeInTheDocument();
  });
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining('/exec'),
    expect.objectContaining({ method: 'POST' }),
  );
  expect(screen.getByLabelText('India (+91)')).toBeChecked();
  expect(screen.getByPlaceholderText('Your Name')).toHaveValue('');
});

test('clears status when changing country and reports submission failures', async () => {
  const fetchMock = jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));
  const { container } = render(<ContactUs />);
  const form = container.querySelector('form') as HTMLFormElement;

  fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
    target: { name: 'phone', value: '0000000000' },
  });
  fireEvent.submit(form);
  expect(screen.getByText('Please enter a valid 10-digit Indian mobile number.')).toBeInTheDocument();

  fireEvent.click(screen.getByLabelText('Other'));
  expect(screen.queryByText(/Please enter a valid/)).not.toBeInTheDocument();
  const phone = screen.getByPlaceholderText('Phone Number (+447911123456)');
  fireEvent.change(phone, { target: { name: 'phone', value: '+123' } });
  fireEvent.submit(form);
  expect(screen.getByText(/valid international phone number/)).toBeInTheDocument();

  fireEvent.change(phone, { target: { name: 'phone', value: '447911123456' } });
  expect(phone).toHaveValue('447911123456');

  fireEvent.change(screen.getByLabelText('Other'), { target: { value: 'unknown' } });
  fireEvent.submit(form);
  expect(screen.getByText(/valid international phone number/)).toBeInTheDocument();

  fireEvent.click(screen.getByLabelText('Other'));
  const validPhone = screen.getByPlaceholderText('Phone Number (+447911123456)');
  fireEvent.change(validPhone, { target: { name: 'phone', value: '+447911123456' } });
  fillRequiredContactFields();
  fireEvent.submit(form);

  await waitFor(() => {
    expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
  });
  expect(fetchMock).toHaveBeenCalled();
});