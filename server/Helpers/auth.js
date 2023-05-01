/**
 * This files contains functions that deals with user authentication.
 */
require('dotenv').config()

const UserModel = require('../models/User');
const { createUser, getUserAccessToken } = require('./utils');
const jwt = require('jsonwebtoken');

/**
 * A user login
 * @param { String } username 
 * @param { String } password 
 */
async function authLogin(username, password) {
    // Authenticate user
    const targetUser = await UserModel.findOne({ username: username, password: password });
    if (!targetUser) {
        console.log('No such user exists.');
        return null;
    } else {
        token = getUserAccessToken(username, password);
        console.log(targetUser);
        // targetUser.token = token;
        await UserModel.updateOne(
            {
                username: username,
                token: '',
            },
            {
                $set: { token: token, }
            }
        )
        return token;
    }
}

/**
 * 
 * @param { String } username 
 * @param { String } token 
 * @returns 
 */
async function authLogout(username, token) {
    const targetUser = await UserModel.findOne({ username: username, token: token });
    if (!targetUser) {
        console.log('No such user exists.');
        return { status: 'error' };
    } else {
        // token = getUserAccessToken(username, password);
        console.log(targetUser);
        console.log(token);
        await UserModel.updateOne(
            {
                username: username,
                token: token
            },
            {
                $set: { token: '' }
            }
        )
        return { status: 'success' };
    }
}

/**
 * 
 * @param { String } username 
 * @param { String } password 
*/
async function authRegister(username, password) {
    const token = await createUser(username, password, 1);
    // const token = await authLogin(username, password);
    return token; 
}

module.exports = { authLogin, authLogout, authRegister };