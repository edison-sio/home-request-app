// Login page of the app.
import React from 'react';
import Container from '@mui/material/Container';

import styled from 'styled-components';

import LoginForm from './LoginForm';

const LoginPage = () => {
    // Declare state variables for log in details.
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    // const [password, setPassword] = useState('');

    // Declare functions for login, logout, etc.
    return (
        <FormContainer maxWidth='xs'>
            <LoginForm />
        </FormContainer>
    )
}

const FormContainer = styled(Container)`
    margin-top: 20vh;
`

export default LoginPage;
