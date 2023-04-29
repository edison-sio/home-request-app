const RewardPlanModel = require('../models/RewardPlan');
const UserModel = require('../models/User')

const { authenticateUser } =  require('./utils');

const createRewardPlan = async (planName, planType, planAdmin, token) => {
    if (!authenticateUser(planAdmin, token)) {
        return {
            status: 'error',
        }
    }
    const newPlan = {
        planName: planName,
        planType: planType,
        missions: [],
        planAdmin: planAdmin,
        planParticipants: []
    }
    RewardPlanModel.create(newPlan).catch((e) => {
        console.log(e);
    });
    
    const targetUser = await UserModel.findOne({ username: planAdmin });
    const planList = targetUser.planList;

    console.log(targetUser);

    planList.push(planName);
    UserModel.updateOne(
        { username: planAdmin },
        {
            $set: { planList: planList }
        }
    ).catch((e) => {
        console.log(e);
    })
} 

/**
 * Add a new mission
 * @param { String } missionName 
 * @param { String } planName 
 * @param { String } planAdmin 
 * @param { String } token 
 * @returns 
 */
const addPlanMission = async (missionName, planName, planAdmin, token) => {
    if (!authenticateUser(planAdmin, token)) {
        return {
            status: 'error',
        }
    }
    const targetPlan = await RewardPlanModel.findOne({ planName: planName });
    const missionList = targetPlan.missionList;
    const waitingList = targetPlan.waitingList;
    missionList.push(missionName);
    waitingList.push(missionName);

    RewardPlanModel.updateOne(
        { planName: planName },
        {
            $set: {
                missionList: missionList,
                waitingList: waitingList
            }
        }
    ).catch((e) => {
        console.log(e);
    })
}

const moveMissionToPending = async (missionName, planName, planMember, token) => {
    if (!authenticateUser(planMember, token)) {
        return {
            status: 'error',
        }
    }
    const targetMission = await RewardPlanModel.findOne({ planName: planName });
    const waitingList = targetMission.waitingList;
    const pendingList = targetMission.pendingList;

    const i = waitingList.indexOf(missionName);
    waitingList.splice(i, 1);
    pendingList.push(missionName);

    RewardPlanModel.updateOne(
        { planName: planName },
        {
            $set: {
                waitingList: waitingList,
                pendingList: pendingList,
            }
        }
    ).catch((e) => {
        console.log(e);
    })
}

const moveMissionToWaiting = async (missionName, planName, planMember, token) => {
    if (!authenticateUser(planMember, token)) {
        return {
            status: 'error',
        }
    }
    const targetMission = await RewardPlanModel.findOne({ planName: planName });
    const waitingList = targetMission.waitingList;
    const pendingList = targetMission.pendingList;

    console.log(targetMission);
    console.log(pendingList);

    const i = pendingList.indexOf(missionName);
    pendingList.splice(i, 1);
    waitingList.push(missionName);

    RewardPlanModel.updateOne(
        { planName: planName },
        {
            $set: {
                waitingList: waitingList,
                pendingList: pendingList,
            }
        }
    ).catch((e) => {
        console.log(e);
    })
}

/**
 * Add a plan member
 * @param { String } memberName 
 * @param { String } planName 
 * @param { String } planAdmin 
 * @param { String } token 
 * @returns 
 */
const addPlanMember = async (memberName, planName, planAdmin, token) => {
    if (!authenticateUser(planAdmin, token)) {
        return {
            status: 'error',
        }
    }
    const targetPlan = RewardPlanModel.findOne({ planName: planName });
    const memeberList = targetPlan.memeberList;
    memberList.push(memberName);
    
    RewardPlanModel.updateOne(
        { planName: planName },
        {
            $set: {
                memberList: memberList,
            }
        }
    )
}


module.exports = { createRewardPlan, addPlanMission, addPlanMember, moveMissionToPending, moveMissionToWaiting }