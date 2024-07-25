import React, { useContext, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { AuthContext } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const AppPage = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {

        const auth = localStorage.getItem('auth');

        if(!auth){
            navigate('/signin')
        }

    });

    return (
        <Container maxWidth="xs" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Welcome to the application.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => {
                logout();
                navigate('/signin');
            }
            }>
                Logout  
            </Button>
        </Container>
    );
};

export default AppPage;