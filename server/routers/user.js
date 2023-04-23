const express = require('express');
var router = express.Router();

const UserModel = require('../models/User');

router.get('/', (req, res) => {
    console.log('Getting user data');
    // UserModel.get
});

module.exports = router;