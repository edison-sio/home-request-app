const mongoose = require('mongoose');

/**
 * Define rewardPlan data structure.
 */
const rewardPlanSchema = new mongoose.Schema({
    planName: { type: String, required: true, unique: true },
    planType: { type: String, required: true },
    missions: { type: [Object] },
    planAdmin: { type: String, required: true },
    planParticipants: { type: [Object], required: true }
});

module.exports = mongoose.model('rewardPlan', rewardPlanSchema);
