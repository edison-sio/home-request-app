const mongoose = require('mongoose');

/**
 * Define user data structure.
 */
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    hashedPassword: { type: String, required: true },
    permissionId: { type: Number, required: true }, // 0 -> Admin; 1 -> User.
    token: { type: String, required: true },
    plansAdministering: { type: [String] },
    plansParticipating: { type: [String] },
    family: { type: [String] },
});

module.exports = mongoose.model('user', userSchema);
