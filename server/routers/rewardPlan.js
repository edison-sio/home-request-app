const express = require('express');
var router = express.Router();

const UserModel = require('../models/User');
// const { authRegister, authLogin, authLogout } = require('../functions/auth');
const { 
    createRewardPlan, addPlanMission, addPlanMember, 
    moveMissionToPending, moveMissionToWaiting 
} = require('../functions/rewardPlan')

router.post('/', async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const { planName, planAdmin } = req.body;
    await createRewardPlan(planName, planAdmin, token)
    res.json({ status: 'success' });
});

router.post('/mission', async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const { planName, planAdmin, missionName } = req.body;
    await addPlanMission(missionName, planName, planAdmin, token);
    res.json({ status: 'success' });
})

router.post('/mission/toWaiting', async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const { planName, planMember, missionName } = req.body;
    await moveMissionToWaiting(missionName, planName, planMember, token);
    res.json({ status: 'success' });
})

router.post('/mission/toPending', async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const { planName, planMember, missionName } = req.body;
    await moveMissionToPending(missionName, planName, planMember, token);
    res.json({ status: 'success' });
})

module.exports = router;