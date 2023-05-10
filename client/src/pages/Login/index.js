// Login page of the app.
import React from 'react';
import Container from '@mui/material/Container';

import styled from 'styled-components';

import LoginForm from './LoginForm';

const LoginPage = () => {
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
