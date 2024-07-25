import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; // Adjust the path based on where App is located

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Email");
  expect(linkElement).toBeInTheDocument();
});