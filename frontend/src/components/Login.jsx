import React from 'react'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './login.css'

function Login() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ bgcolor: '#cfe8fc', height: '50vh' }}>
                <div className='login-container'>
                <TextField className='email-field' id="outlined-basic" label="Email" variant="outlined" />
                <TextField className='password-field' type="password" id="outlined-basic" label="Password" variant="outlined" />
                <Button variant="contained">Login</Button>
                </div>
            </Box>
        </Container>
         
      );
}

export default Login