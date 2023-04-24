const express = require('express');
var router = express.Router();

const UserModel = require('../models/User');
const { authRegister, authLogin, authLogout } = require('../functions/auth');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const token = await authRegister(username, password);
    res.json({ token: token });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const token = await authLogin(username, password);
    res.json({ token: token });
});

router.post('/logout', (req, res) => {
    const username = req.body.req;
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    console.log(username, token);
    res.send('logout');
});

module.exports = router;