require("dotenv").config();

const Discord = require("discord.js");
const config = require("./configs/config.json");
const wokCommands = require("wokcommands");
const { status: s, interval } = require("./configs/botActivity");

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.on("ready", () => {
  client.prefix = config.prefix;
  client.embedColor = config.embedColor;
  const statusOptions = s(client);
  const randomStatus = () => {
    const status = Math.floor(Math.random() * statusOptions.length);
    client.user.setActivity(statusOptions[status].text, {
      type: statusOptions[status].type,
    });
  };
  setInterval(randomStatus, interval);

  // client.user.setStatus(config.botActivity.status);
  const messagesPath = "./messages.json";
  const dbOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  new wokCommands(client, {
    commandsDir: "commands",
    featureDir: "events",
    messagesPath,
    showWarns: true,
    dbOptions,
  })
    .setDisplayName(client.user.username)
    .setMongoPath(process.env.MONGO_URI)
    .setDefaultPrefix(config.prefix)
    .setBotOwner(config["owner/dev_DiscordID"]);
  console.log(`${client.user.username} is ready!`);
});

client.login(process.env.TOKEN);
