const express = require('express');
var router = express.Router();

const UserModel = require('../models/User');
const { authRegister, authLogin, authLogout } = require('../Helpers/auth');

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

router.post('/logout', async (req, res) => {
    const authHeader = req.headers.authorization;
    const username = req.body.username;
    const token = authHeader.split(' ')[1];

    const status = await authLogout(username, token);
    res.json(status);
});

module.exports = router;