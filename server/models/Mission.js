/**
 * Define user data structure.
 */
const MissionSchema = new mongoose.Schema({
    missionName: { type: String },
});

module.exports = { MissionSchema };
