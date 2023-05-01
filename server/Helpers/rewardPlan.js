const RewardPlanModel = require('../Models/RewardPlan');
const UserModel = require('../Models/User')

const { authenticateUser, checkUserExist } =  require('./utils');

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
 * Delete a reward plan.
 * @param { String } planName 
 * @param { String } planAdmin 
 * @param { String } token 
 * @returns 
 */
const deleteRewardPlan = async (planName, planAdmin, token) => {
    if (!authenticateUser(planAdmin, token)) {
        return {
            status: 'error',
        }
    }
    // Get plan admin and participants name for removing plans from database later.
    // const targetPlan = await RewardPlanModel.findOne({ planName: planName });
    const targetPlan = RewardPlanModel.deleteOne({ planName: planName });
    const planParticipants = targetPlan.planParticipants;

    RewardPlanModel(newPlan).catch((e) => {
        console.log(e);
    });
    
    
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
    const missions = targetPlan.missions;
    missions.push(missionName);

    RewardPlanModel.updateOne(
        { planName: planName },
        {
            $set: {
                missions: missions
            }
        }
    ).catch((e) => {
        console.log(e);
    })
}

const updatePlanMission = async (oldMissionName, newMissionName, planName, planAdmin, token) => {
    if (!authenticateUser(planAdmin, token)) {
        return {
            status: 'error',
        }
    }
    /**
     * @todo: Update mission name
     */
    return {
        status: 'success',
    }
}


const removePlanMission = async (missionName, planName, planAdmin, token) => {
    if (!authenticateUser(planAdmin, token)) {
        return {
            status: 'error',
        }
    }
    const targetPlan = await RewardPlanModel.findOne({ planName: planName });
    const missions = targetPlan.missions;
    missions.shift(missionName);

    RewardPlanModel.updateOne(
        { planName: planName },
        {
            $set: {
                missions: missions,
            }
        }
    ).catch((e) => {
        console.log(e);
    })
    return {
        status: 'success',
    }
}

// const moveMissionToPending = async (missionName, planName, planMember, token) => {
//     if (!authenticateUser(planMember, token)) {
//         return {
//             status: 'error',
//         }
//     }
//     const targetMission = await RewardPlanModel.findOne({ planName: planName });
//     const waitingList = targetMission.waitingList;
//     const pendingList = targetMission.pendingList;

//     const i = waitingList.indexOf(missionName);
//     waitingList.splice(i, 1);
//     pendingList.push(missionName);

//     RewardPlanModel.updateOne(
//         { planName: planName },
//         {
//             $set: {
//                 waitingList: waitingList,
//                 pendingList: pendingList,
//             }
//         }
//     ).catch((e) => {
//         console.log(e);
//     })
// }

// const moveMissionToWaiting = async (missionName, planName, planMember, token) => {
//     if (!authenticateUser(planMember, token)) {
//         return {
//             status: 'error',
//         }
//     }
//     const targetMission = await RewardPlanModel.findOne({ planName: planName });
//     const waitingList = targetMission.waitingList;
//     const pendingList = targetMission.pendingList;

//     console.log(targetMission);
//     console.log(pendingList);

//     const i = pendingList.indexOf(missionName);
//     pendingList.splice(i, 1);
//     waitingList.push(missionName);

//     RewardPlanModel.updateOne(
//         { planName: planName },
//         {
//             $set: {
//                 waitingList: waitingList,
//                 pendingList: pendingList,
//             }
//         }
//     ).catch((e) => {
//         console.log(e);
//     })
// }

// /**
//  * Add a plan member
//  * @param { String } memberName 
//  * @param { String } planName 
//  * @param { String } planAdmin 
//  * @param { String } token 
//  * @returns 
//  */
const addPlanParticipant = async (participantName, planName, planAdmin, token) => {
    if (!authenticateUser(planAdmin, token)) {
        return {
            status: 'error',
        }
    }
    if (!checkUserExist(participantName)) {
        return {
            status: 'error',
        }
    }
    const targetPlan = RewardPlanModel.findOne({ planName: planName });
    const planParticipants = targetPlan.planParticipants;
    planParticipants.push(participantName);
    
    RewardPlanModel.updateOne(
        { planName: planName },
        {
            $set: {
                planParticipants: planParticipants,
            }
        }
    )
}

const removePlanParticipant = async (participantName, planName, planAdmin, token) => {
    if (!authenticateUser(planAdmin, token)) {
        return {
            status: 'error',
        }
    }
    if (!checkUserExist(participantName)) {
        return {
            status: 'error',
        }
    }
    const targetPlan = RewardPlanModel.findOne({ planName: planName });
    const planParticipants = targetPlan.planParticipants;
    if (!(participantName in planParticipants)) {
        return {
            status: 'error',
        }
    }
    planParticipants.shift(participantName);
    
    RewardPlanModel.updateOne(
        { planName: planName },
        {
            $set: {
                planParticipants: planParticipants,
            }
        }
    )
}


module.exports = { createRewardPlan, addPlanMission, removePlanMission, addPlanParticipant, removePlanParticipant, }
