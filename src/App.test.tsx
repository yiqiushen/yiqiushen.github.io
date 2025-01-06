import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Yiqiu Shen/i);
  expect(nameElement).toBeInTheDocument();
});
