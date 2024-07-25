import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthCheck from './AuthCheck'; // Adjust based on your file structure

// Mocking the useNavigate function  
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('AuthCheck Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Set the mocked navigate function  
    jest.clearAllMocks();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    // Optionally clear localStorage before each test  
    localStorage.clear();
  });

  it('redirects to /app when auth is present in localStorage', () => {
    // Set up localStorage with auth  
    localStorage.setItem('auth', 'some_auth_token');

    render(
      <MemoryRouter>
        <AuthCheck />
      </MemoryRouter>
    );

    // Check that navigate was called with '/app'
    expect(mockNavigate).toHaveBeenCalledWith('/app');
  });

  it('redirects to /signin when auth is not present in localStorage', () => {
    // Clear localStorage to simulate missing auth  
    localStorage.removeItem('auth');

    render(
      <MemoryRouter>
        <AuthCheck />
      </MemoryRouter>
    );

    // Check that navigate was called with '/signin'
    expect(mockNavigate).toHaveBeenCalledWith('/signin');
  });
});