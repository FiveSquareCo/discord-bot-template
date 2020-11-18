const mongoose = require("mongoose");

const reqStrig = {
  type: String,
  required: true,
};

const levelSchema = mongoose.Schema({
  guildId: reqStrig,
  userId: reqStrig,
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("levels", levelSchema);
