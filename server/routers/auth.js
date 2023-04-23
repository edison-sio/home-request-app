const express = require('express');
var router = express.Router();

const UserModel = require('../models/User');
const { authRegister, authLogin, authLogout } = require('../functions/auth');

router.get('/login/:username', (req, res) => {
    res.send('username: ' + req.params.username);
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    authRegister(username, password);
});

router.get('/logout', (req, res) => {
    res.send('logout');
});

module.exports = router;