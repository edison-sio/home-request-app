const mongoose = require('mongoose');

// const { MissionSchema } = require('./Mission');

/**
 * Define rewardPlan data structure.
 */
const rewardPlanSchema = new mongoose.Schema({
    planName: { type: String, required: true, unique: true },
    missionList: { type: [String], required: true },
    waitingList: { type: [String], required: true },
    pendingList: { type: [String], required: true },
    planAdmin: { type: String, required: true },
    planMembers: { type: [String], required: true }
});

module.exports = mongoose.model('rewardPlan', rewardPlanSchema);
