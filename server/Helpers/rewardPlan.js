const RewardPlanModel = require('../models/RewardPlan');
const UserModel = require('../models/User')

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
    const plansAdministering = targetUser.plansAdministering;

    console.log(targetUser);

    plansAdministering.push(planName);
    UserModel.updateOne(
        { username: planAdmin },
        {
            $set: { plansAdministering: plansAdministering }
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

// /**
//  * Add a new mission
//  * @param { String } missionName 
//  * @param { String } planName 
//  * @param { String } planAdmin 
//  * @param { String } token 
//  * @returns 
//  */
// const addPlanMission = async (missionName, planName, planAdmin, token) => {
//     if (!authenticateUser(planAdmin, token)) {
//         return {
//             status: 'error',
//         }
//     }
//     const targetPlan = await RewardPlanModel.findOne({ planName: planName });
//     const missions = targetPlan.missions;
//     missions.push(missionName);

//     RewardPlanModel.updateOne(
//         { planName: planName },
//         {
//             $set: {
//                 missions: missions
//             }
//         }
//     ).catch((e) => {
//         console.log(e);
//     })
// }

// const updatePlanMission = async (oldMissionName, newMissionName, planName, planAdmin, token) => {
//     if (!authenticateUser(planAdmin, token)) {
//         return {
//             status: 'error',
//         }
//     }
//     /**
//      * @todo: Update mission name
//      */
//     return {
//         status: 'success',
//     }
// }


// const removePlanMission = async (missionName, planName, planAdmin, token) => {
//     if (!authenticateUser(planAdmin, token)) {
//         return {
//             status: 'error',
//         }
//     }
//     const targetPlan = await RewardPlanModel.findOne({ planName: planName });
//     const missions = targetPlan.missions;
//     missions.shift(missionName);

//     RewardPlanModel.updateOne(
//         { planName: planName },
//         {
//             $set: {
//                 missions: missions,
//             }
//         }
//     ).catch((e) => {
//         console.log(e);
//     })
//     return {
//         status: 'success',
//     }
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
    const newParticipant = {
        username: participantName,
        history: [],
    }
    planParticipants.push(newParticipant);
    
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
    // if (!(participantName in planParticipants)) {
    //     return {
    //         status: 'error',
    //     }
    // }
    const targetParticipant = null;
    for (const planParticipant in planParticipant) {
        if (planParticipant.username == participantName) {
            targetParticipant = planParticipant;
        }
    }
    if (!targetParticipant) {
        errorHandler('Failed to remove participant');
    }
    planParticipants.shift(targetParticipant);
    
    RewardPlanModel.updateOne(
        { planName: planName },
        {
            $set: {
                planParticipants: planParticipants,
            }
        }
    )
}


module.exports = { createRewardPlan, addPlanParticipant, removePlanParticipant, }
