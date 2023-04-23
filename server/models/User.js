const mongoose = require('mongoose');

/**
 * Define user data structure.
 */
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true, unique: false },
    permissionId: { type: Number, required: true }, // 0 -> Admin; 1 -> User.
    jwt: { type: String, required: false },
});

module.exports = mongoose.model('user', userSchema);

