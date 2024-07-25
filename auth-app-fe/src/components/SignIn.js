import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { AuthContext } from '../utils/AuthContext';

const SignIn = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {

        const auth = localStorage.getItem('auth');

        if(auth){
            navigate('/app')
        }

    });

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Both fields are required.');
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/auth/signin`, { email, password });
            if (response.status === 200) {
                localStorage.setItem('auth', JSON.stringify(response.data)); // Store user info  
                login(); // Call login method  
                navigate('/app');
            } else {
                alert('Sign-in failed');
            }
        } catch (err) {
            alert('Sign-in failed');
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign In  
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form noValidate onSubmit={handleSignIn}>
                <TextField label="Email" variant="outlined" fullWidth margin="normal" 
                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" 
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button data-testid="sign-in-button" type="submit" variant="contained" color="primary" fullWidth>Sign In</Button>
            </form>
        </Container>
    );
};

export default SignIn;