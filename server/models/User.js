const mongoose = require('mongoose');

/**
 * Define user data structure.
 */
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    hashedPassword: { type: String, required: true },
    permissionId: { type: Number, required: true }, // 0 -> Admin; 1 -> User.
    token: { type: String, required: true },
    plansAdministering: { type: [String] ,required: true },
    plansParticipating: { type: [String], required: true },
    family: { type: [String] , required: true },
});

module.exports = mongoose.model('user', userSchema);
