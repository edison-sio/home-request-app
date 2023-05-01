import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import styled from 'styled-components';

const LoginForm = (props) => {
    // Declare state variables for log in details.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
    <Stack spacing={2}>
        <Title><PinkText>Sarah</PinkText>'s Home</Title>
        <TextField id="outlined-basic" label="Username" variant="outlined" value={username} />
        <TextField id="outlined-basic" label="password" variant="outlined" type='password' value={password} />
        <Button variant='contained' onClick={() => {setUsername(username); console.log(username); }}>setUsername</Button>
        <Button variant='contained' onClick={() => {setPassword(password); console.log(password); }}>setPassword</Button>
    </Stack>
    )
}

const PinkText = styled.span`
    color: pink;
`

const Title = styled.h1`
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
`

export default LoginForm;