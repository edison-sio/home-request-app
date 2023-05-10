const RewardPlanModel = require('../models/RewardPlan');
const { authenticateUser } = require('./utils');
const { errorController } = require('./errors');

const getMissionDetails = async (username, token, planName, missionName) => {
    // Authenticate user
    if (!authenticateUser(username, token)) {
        errorController('Authentication error');
    }
    // Get rewardPlan document
    const targetPlan = await RewardPlanModel.findOne({ planName: planName });
    const missions = targetPlan.missions;
    for (const mission of missions) {
        if (mission.missionName == missionName) {
            return {
                mission: mission,
            }    
        }
    }
    errorController(`Failed to get mission "${missionName}"`);
}

const createMission = async (username, token, planName, missionName) => {
    // Authenticate user
    if (!authenticateUser(username, token)) {
        errorController('Authentication error');
    }
    // Get rewardPlan document to update
    const targetPlan = await RewardPlanModel.findOne({ planName: planName });
    const missions = targetPlan.missions;
    // Add a new mission to the list
    const newMission = {
        missionName: missionName,
        status: 'active',
    }
    missions.push(newMission);
    // Update rewardPlan
    await RewardPlanModel.updateOne(
        {
            planName: planName,
        },
        {
            $set: {
                missions: missions,
            }
        }
    );
    return {
        status: 'success',
    }
}

const deleteMission = async (username, token, planName, missionName) => {
    // Authenticate user
    if (!authenticateUser(username, token)) {
        errorController('Authentication error');
    }
    // Get rewardPlan document to update
    const targetPlan = await RewardPlanModel.findOne({ planName: planName });
    const missions = targetPlan.missions;
    // Delete mission from missions
    var targetMission = null;
    for (const mission of missions) {
        if (mission.missionName == missionName) {
            targetMission = mission;
        }
    }
    if (!targetMission) {
        errorController('Failed to delete mission');
    }
    missions.shift(targetMission);
    return {
        status: 'success',
    }

}

const updateMissionStatus = async (username, token, planName, missionName, status) => {
    // Authenticate user
    if (!authenticateUser(username, token)) {
        errorController('Authentication error');
    }
    // Get rewardPlan document to update
    const targetPlan = await RewardPlanModel.findOne({ planName: planName });
    const missions = targetPlan.missions;
    // Find a specific mission and update its status
    var missionFound = false;
    for (const mission of missions) {
        if (mission.missionName == missionName) {
            mission.status = status;
            missionFound = true;
        }
    }
    // Update rewardPlan
    await RewardPlanModel.updateOne(
        {
            planName: planName,
        },
        {
            $set: {
                missions: missions,
            }
        }
    );
    if (!missionFound) {
        errorController('Failed to update mission status');
    }
    return {
        status: 'success',
    }
}

module.exports = { createMission, deleteMission, getMissionDetails, updateMissionStatus }