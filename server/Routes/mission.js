const express = require('express');
var router = express.Router();

const { getMissionDetails, createMission, deleteMission, updateMissionStatus } = require('../Helpers/mission');

// router.get('/', async (req, res) => {
    
// });

router.post('/', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const { username, planName, missionName } = req.body;
    console.log(req.body);
    const status = await createMission(username, token, planName, missionName);
    res.json(status);
});

router.delete('/', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const { username, planName, missionName } = req.body;
    console.log(req.body);
    const status = await deleteMission(username, token, planName, missionName);
    res.json(status);
});

router.post('/status', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const { username, planName, missionName, status } = req.body;
    const resStatus = await updateMissionStatus(username, token, planName, missionName, status);
    res.json(resStatus);
});

module.exports = router;
