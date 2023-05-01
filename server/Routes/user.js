const express = require('express');
var router = express.Router();

const UserModel = require('../models/User');

/**
 * Get a list of all users with their details.
 */
router.get('/', async (req, res) => {
    const users = await UserModel.find();
    res.json(users);
});


module.exports = router;