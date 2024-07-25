import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // State for success message  
    const history = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (auth) {
            history('/app');
        }
    }, [history]);

    const validatePassword = (password) => {
        const minLength = 8;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return 'Password must be at least 8 characters long.';
        }
        if (!hasLetter) {
            return 'Password must contain at least one letter.';
        }
        if (!hasNumber) {
            return 'Password must contain at least one number.';
        }
        if (!hasSpecialChar) {
            return 'Password must contain at least one special character.';
        }
        return null; // No errors  
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const passwordError = validatePassword(password);
        
        if (passwordError) {
            setError(passwordError);
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/auth/signup`, { email, name, password });
            if (response.status === 201) {
                setSuccess('Signup successful! You can now sign in.'); // Set success message  
                setError(''); // Clear any existing errors  
                // Redirect after a brief delay if needed:
                setTimeout(() => {
                    history('/signin');
                }, 2000); // Adjust time as necessary  
            } else {
                alert('Signup failed');
            }
        } catch (err) {
            alert('Signup failed');
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign Up  
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>} {/* Display success message */}
            <form noValidate onSubmit={handleSignup}>
                <TextField  
                    label="Email"
                    variant="outlined"
                    fullWidth  
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required  
                />
                <TextField  
                    label="Name"
                    variant="outlined"
                    fullWidth  
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required  
                />
                <TextField  
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth  
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required  
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up  
                </Button>
            </form>
        </Container>
    );
};

export default Signup;