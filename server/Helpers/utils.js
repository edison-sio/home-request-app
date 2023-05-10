// Get database models
require('dotenv').config();

const UserModel = require('../models/User');
const RewardPlanModel = require('../models/RewardPlan');
const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
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
    const token = generateUserAccessToken(username, password);
    newUser = {
        username: username,
        hashedPassword: passwordHash(password),
        permissionId: permissionId,
        token: token,
        plansAdministering: [],
        plansParticipating: [],
    }
    UserModel.create(newUser)
        .catch((e) => {
            console.log(e);
        });
    return token;
}

const generateUserAccessToken = (username, password) => {
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
    console.log(token);
    console.log(targetToken);
    if (targetToken != token) {
        console.log('Authentication failed');
        return false
    }
    return true
}

const checkUserExist = async (username) => {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
        return false;
    }
    return true;
}

const passwordHash = (password) => {
    return createHash('sha256').update(password + process.env.PASSWORD_HASH_SECRET).digest('hex');
}

// const updateUesr = async ()

module.exports = { createUser, generateUserAccessToken, authenticateUser, checkUserExist, passwordHash };