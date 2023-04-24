// Get database models
require('dotenv').config();

const UserModel = require('../models/User');
const RewardPlanModel = require('../models/RewardPlan');
const jwt = require('jsonwebtoken');
/**
 * Create a new user by adding it into MongoDB database
 * Use cases:
 * 1. User register
 * 2. Admin user creates user
 * 
 * @param { String } username 
 * @param { String } password 
 */
// async function createUser(username, password, permissionId) {
const createUser = async (username, password, permissionId) => {
    const token = getUserAccessToken(username, password);
    newUser = {
        username: username,
        password: password,
        permissionId: permissionId,
        token: token,
        planList: []
    }
    UserModel.create(newUser)
        .catch((e) => {
            console.log(e);
        });
    return token;
}

const getUserAccessToken = (username, password) => {
    const user = { username: username };
    token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET + password);
    return token
}

const authenticateUser = async (username, token) => {
    console.log(username)
    const targetUser = await UserModel.findOne({ username: username });
    if (!targetUser) {
        console.log('No user named ' + username);
        return false
    }
    const targetToken = targetUser.token;
    if (targetToken != token) {
        console.log('Authentication failed');
        return false
    }
    return true
}

// const updateUesr = async ()

module.exports = { createUser, getUserAccessToken, authenticateUser }