import React from 'react';
import { render } from '@testing-library/react';
import SEO from './SEO.jsx';

test('renders default SEO metadata', () => {
  render(<SEO />);

  expect(document.title).toBe('Swaroop Reddy Vudumula | Software Engineer, Agri Milk & Pharma Tech');
  expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
    'content',
    expect.stringContaining('Official portfolio'),
  );
  expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://swaroopvudumula.com/',
  );
});

test('renders custom SEO metadata', () => {
  render(
    <SEO
      title="Projects"
      description="Selected projects"
      keywords="projects, software"
      canonicalUrl="https://example.com/projects"
    />,
  );

  expect(document.title).toBe('Projects | Swaroop Reddy Vudumula');
  expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
    'content',
    'Selected projects',
  );
  expect(document.head.querySelector('meta[name="keywords"]')).toHaveAttribute(
    'content',
    'projects, software',
  );
  expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://example.com/projects',
  );
});