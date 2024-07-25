import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from './SignIn';

jest.mock('axios');

const MockAuthContext = ({ children }) => {
    const login = jest.fn();
    return (
        <AuthContext.Provider value={{ login }}>
            {children}
        </AuthContext.Provider>
    );
};

describe('SignIn Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.alert = jest.fn();
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        };
    });

    test('renders the SignIn form', () => {
        render(
            <Router>
                <MockAuthContext>
                    <SignIn />
                </MockAuthContext>
            </Router>
        );

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
    });

    test('shows error when fields are empty', async () => {
        render(
            <Router>
                <MockAuthContext>
                    <SignIn />
                </MockAuthContext>
            </Router>
        );

        fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

        expect(await screen.findByText(/Both fields are required./i)).toBeInTheDocument();
    });

    test('handles successful sign-in', async () => {
        const mockLogin = jest.fn();
        axios.post.mockResolvedValueOnce({ status: 200, data: { token: 'dummy_token' } });

        render(
            <Router>
                <AuthContext.Provider value={{ login: mockLogin }}>
                    <SignIn />
                </AuthContext.Provider>
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalled();
            expect(localStorage.getItem('auth')).toBe(JSON.stringify({ token: 'dummy_token' }));
            // You can further test navigation if you mock `useNavigate`
        });
    });


});