const { version } = require("../package.json");
const { prefix } = require("./config.json");
module.exports.status = (client) => {
  return [
    {
      text: `Five Square Co.`,
      type: "WATCHING",
    },
    {
      text: "Feature Rich Bot Template by FiveSquareCo.",
      type: "PLAYING",
    },
    {
      text: `Version ${version}`,
      type: "PLAYING",
    },
    {
      text: `${client.users.cache.size} Users`,
      type: "WATCHING",
    },
    {
      text: `${prefix}Help | `,
      type: "WATCHING",
    },
  ];
};

module.exports.interval = 30000;
