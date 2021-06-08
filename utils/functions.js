module.exports.modlogsGen = async () => {
  return null;
};
module.exports.setClientVars = async (client) => {
  // client
};

module.exports.getMinutes = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + "M :" + (seconds < 10 ? "0" : "") + seconds + "s";
};
