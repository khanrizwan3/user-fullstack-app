import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import AppPage from './AppPage';

const mockLogout = jest.fn();

const renderWithAuthContext = (authValue) => {
    return render(
        <AuthContext.Provider value={{ logout: mockLogout }}>
            <MemoryRouter initialEntries={['/app']}>
                <Routes>
                    <Route path="/app" element={<AppPage />} />
                    <Route path="/signin" element={<div>Sign In Page</div>} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );
};

describe('AppPage', () => {
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('should navigate to /signin if no auth is present', () => {
        renderWithAuthContext();

        // Check if the Sign In Page is rendered  
        expect(screen.getByText(/Sign In Page/i)).toBeInTheDocument();
    });

    it('should render the AppPage when auth is present', () => {
        localStorage.setItem('auth', 'true'); // Simulate authentication

        renderWithAuthContext();

        // Check if the AppPage content is displayed  
        expect(screen.getByText(/Welcome to the application/i)).toBeInTheDocument();
    });

    it('should call logout and navigate to /signin on button click', () => {
        localStorage.setItem('auth', 'true'); // Simulate authentication  
        renderWithAuthContext();

        // Click the logout button  
        fireEvent.click(screen.getByRole('button', { name: /Logout/i }));

        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(screen.getByText(/Sign In Page/i)).toBeInTheDocument();
    });
});