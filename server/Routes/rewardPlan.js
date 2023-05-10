const express = require('express');
var router = express.Router();

const UserModel = require('../models/User');
// const { authRegister, authLogin, authLogout } = require('../functions/auth');
const { 
    createRewardPlan, addPlanMission, removePlanMission, 
    addPlanParticipant, removePlanParticipant,
} = require('../Helpers/rewardPlan')

router.post('/', async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    console.log('token below');
    console.log(token);
    const { planName, planType, planAdmin } = req.body;
    const status = await createRewardPlan(planName, planType, planAdmin, token)
    res.json(status);
});

// router.delete('/', async (req, res) => {
//     const authHeader = req.headers.authorization;
//     const token = authHeader.split(' ')[1];
//     const { planName, planAdmin } = req.body;
//     await removeRewardPlan()
// })

module.exports = router;