const mongoose = require('mongoose');

/**
 * Define rewardPlan data structure.
 */
const rewardPlanSchema = new mongoose.Schema({
    planName: { type: String, required: true, unique: true },
    planType: { type: String, required: true },
    missions: { type: [String] },
    planAdmin: { type: String, required: true },
    planMembers: { type: [String], required: true }
});

module.exports = mongoose.model('rewardPlan', rewardPlanSchema);
