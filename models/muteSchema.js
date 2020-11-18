const mongoose = require("mongoose");

const reqString = {
  type: String,
  reuired: true,
};
const muteSchema = new mongoose.Schema(
  {
    userId: reqString,
    guildId: reqString,
    reason: reqString,
    staffId: reqString,
    staffTag: reqString,
    expires: {
      type: Date,
      required: true,
    },
    current: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("mute", muteSchema);
