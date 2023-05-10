import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import styled from 'styled-components';

import { authLogin } from '../../helpers/auth';

const LoginForm = (props) => {
    // Declare state variables for log in details.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const submitLogin = () => {
        console.log('yoyoyo');
        authLogin(username, password, retypePassword)
            .then(res => {
                console.log(res);
            })
    }

    const submitTest = async () => {
        console.log('test..');
        const output = await fetch('http://localhost:5001');
        const res = await output.json();
        console.log(res.test);
    }

    return (
    <Stack spacing={2}>
        <Title>Sarah's Home</Title>
        <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={ e => setUsername(e.target.value)} />
        <TextField id="outlined-basic" label="password" variant="outlined" type='password' value={password} onChange={ e => setPassword(e.target.value) } />
        <TextField id="outlined-basic" label="retypePassword" variant="outlined" type='password' value={retypePassword} onChange={ e => setRetypePassword(e.target.value) } />
        <Button variant='contained' onClick={ submitLogin }>Login</Button>
        <Button variant='contained' onClick={ submitTest }>Test</Button>
    </Stack>
    )
}

// const PinkText = styled.span`
//     color: pink;
// `

const Title = styled.h1`
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
`

export default LoginForm;