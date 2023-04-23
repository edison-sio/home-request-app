// Get database models
const UserModel = require('../models/User');

/**
 * Create a new user by adding it into MongoDB database
 * Use cases:
 * 1. User register
 * 2. Admin user creates user
 * 
 * @param { String } username 
 * @param { String } password 
 */
async function createUser(username, password, permissionId) {
    newUser = {
        username: username,
        password: password,
        permissionId: permissionId,
        jwt: 'testtoken'
    }
    UserModel.create(newUser)
        .catch((e) => {
            console.log(e);
        });
}


export { createUser }