/**
 * This files contains functions that deals with user authentication.
 */
const { createUser } = require('./utils');

/**
 * A user login
 * @param { String } username 
 * @param { String } password 
 */
async function authLogin(username, password) {
    console.log('a user logging in');
}

/**
 * 
 * @param { String } username 
 * @param { String } password 
 */
async function authRegister(username, password) {
    createUser(username, password, 1);
}

async function authLogout(username, jwt) {

}

export { authLogin, authLogout, authRegister };