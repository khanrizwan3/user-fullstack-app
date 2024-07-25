import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from './Signup';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import dotenv from 'dotenv';

// Load environment variables  
dotenv.config();

// Mocking axios  
jest.mock('axios');

describe('Signup Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('displays error message for weak password', async () => {
        render(<Signup />, { wrapper: MemoryRouter });

        // Fill the form with a weak password  
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'weak' } });

        // Submit the form  
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        // Check for error message  
        await waitFor(() => {
            expect(screen.getByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();
        });
    });

    test('submits the form successfully', async () => {
        // Mock successful signup response  
        axios.post.mockResolvedValueOnce({ status: 201 });

        render(<Signup />, { wrapper: MemoryRouter });

        // Fill the form with valid data  
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'StrongP@ssw0rd' } });

        // Submit the form  
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        // Wait for successful signup and check if the API was called correctly  
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/auth/signup`, {
                email: 'test@example.com',
                name: 'Test User',
                password: 'StrongP@ssw0rd',
            });

            // Optionally, if you're using react-router to redirect, you can check for it  
            // Simulate redirection  
            expect(window.location.pathname).toBe('/');
        });
    });
});