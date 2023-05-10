// const SERVER_ADDR = '192.168.1.101';
const SERVER_ADDR = 'localhost';
const SERVER_PORT = 5001;
const BASE_URL = `http://${SERVER_ADDR}:${SERVER_PORT}`;

// Auth URLs
export const AUTH_URL = `${BASE_URL}/auth`;
export const LOGIN_URL = `${AUTH_URL}/login`;
export const REGISTER_URL = `${AUTH_URL}/register`;
export const LOGOUT_URL = `${AUTH_URL}/logout`;

// plan URLs
export const PLAN_URL = `${BASE_URL}/plan`;

/**
 * Missions URLs
 * The URLs below should be able to handle actions/events related to missions of a plan.
 * - Get a list of missions (with details?)
 * - Get a list of missions filtered by name regex
 */
export const MISSIONS_URL = `${BASE_URL}/missions`; // e.g. /missions?username=admin&planId=123
export const MISSIONS_SEARCH_URL = `${MISSIONS_URL}/search`; // e.g. /missions?username=admin&planId=123&search=mission1

/** 
 * Mission URLs
 * The URLs below should be able to handle actions/events related to a specific mission.
 * - Get details of a mission.
 * - Create mission.
 * - Edit mission.
 * - Delete mission.
 * - Get mission status. (active/complete)
 * - Update mission status. (active/complete)
 */
export const MISSION_URL = `${BASE_URL}/mission`; // e.g. /mission?username=admin&planId=123&missionId=1
export const MISSION_STATUS_URL = `${MISSION_URL}/status`; // e.g. /mission/status?username=admin&planId=123&missionId=1

/**
 * User URLs
 * The URLs below should be able to handle actions/events related to user control.
 * - Move 
 */