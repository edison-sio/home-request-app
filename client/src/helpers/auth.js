import { LOGIN_URL, REGISTER_URL, LOGOUT_URL } from './urls';

console.log(LOGOUT_URL);

const authRegister = async (username, password, retypePassword) => {
    // Check if the passwords typed in are the same
    if (password !== retypePassword) {
        const errMsg = 'passwords are not the same'
        console.log(errMsg);
        return errMsg;
    }
    // Make login request
    const res = await fetch(REGISTER_URL, {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });

    const output = await res.json();
    console.log(output);
    return output;
}

const authLogin = async (username, password, retypePassword) => {
    // Check if the passwords typed in are the same
    if (password !== retypePassword) {
        const errMsg = 'passwords are not the same'
        console.log(errMsg);
        return errMsg;
    }
    console.log(username, password, retypePassword);
    // Make login request
    console.log(LOGIN_URL);
    const output = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });

    const res = await output.json();
    console.log(res);
    return res;
}

// todo: logout function

export { authRegister, authLogin };