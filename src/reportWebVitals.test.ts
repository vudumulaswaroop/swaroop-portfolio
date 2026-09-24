import reportWebVitals from './reportWebVitals';
import * as webVitals from 'web-vitals';
import { waitFor } from '@testing-library/react';

jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

test('does nothing without a performance handler', () => {
  expect(reportWebVitals()).toBeUndefined();
});

test('registers the performance handler with every metric', async () => {
  const handler = () => undefined;

  reportWebVitals(handler);

  await waitFor(() => expect(webVitals.getCLS).toHaveBeenCalledWith(handler));
  expect(webVitals.getCLS).toHaveBeenCalledWith(handler);
  expect(webVitals.getFID).toHaveBeenCalledWith(handler);
  expect(webVitals.getFCP).toHaveBeenCalledWith(handler);
  expect(webVitals.getLCP).toHaveBeenCalledWith(handler);
  expect(webVitals.getTTFB).toHaveBeenCalledWith(handler);
});