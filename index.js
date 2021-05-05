require("dotenv").config();

const Discord = require("discord.js");
const config = require("./configs/config.json");
const wokCommands = require("wokcommands");

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.on("ready", () => {
  if (config.botActivity.type === "multiple") {
    const randomStaus = () => {
      let random = config.botActivity.multiple.presence;
      let rStatus = Math.floor(Math.random() * random.length);
      client.user.setActivity(random[rStatus], {
        type: config.botActivity.multiple.activity,
      });
    };
    setInterval(randomStaus, 30000);
  } else if (config.botActivity.type === "single") {
    client.user.setActivity(config.botActivity.single.presence, {
      type: config.botActivity.single.activity,
    });
  }

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
    showWarns: true, // Show start up warnings
    dbOptions,
  })
    .setDisplayName(client.user.username)
    .setMongoPath(process.env.MONGO_URI)
    .setDefaultPrefix(config.prefix);
  console.log(`${client.user.username} is ready!`);
});

client.login(process.env.TOKEN);
