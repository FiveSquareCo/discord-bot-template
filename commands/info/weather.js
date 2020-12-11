const weather = require("weather-js");
const { MessageEmbed } = require("discord.js");
const config = require("@config/config.json");
const { info } = require("@config/commands.json");
module.exports = {
  name: "weather",
  commands: ["weather", "climate"],
  minargs: 1,
  category: "info",
  description: "current weather of a city.",
  expectedArgs: "<city-name>",
  callback: async (message, args) => {
    if (info.weather.working) {
      let city = args.join(" ");
      let degreetype = "C"; // You can change it to F. (fahrenheit.)

      await weather.find(
        { search: city, degreeType: degreetype },
        function (err, result) {
          if (!city) return message.channel.send("Please insert the city.");
          if (err || result === undefined || result.length === 0)
            return message.channel.send("Unknown city. Please try again.");
          // console.log(result[0]);
          let current = result[0].current;
          let location = result[0].location;

          const embed = new MessageEmbed()
            .setAuthor(current.observationpoint)
            .setDescription(`> ${current.skytext}`)
            .setThumbnail(current.imageUrl)
            .setTimestamp()
            .setColor(config.embedColor);

          embed
            .addField("Latitude", location.lat, true)
            .addField("Longitude", location.long, true)
            .addField("Feels Like", `${current.feelslike}° Degrees`, true)
            .addField("Degree Type", location.degreetype, true)
            .addField("Humidity", `${current.humidity}%`, true)
            .addField("Timezone", `GMT ${location.timezone}`, true)
            .addField("Temperature", `${current.temperature}° Degrees`, true)
            .addField("Observation Time", current.observationtime, true);

          return message.channel.send(embed);
        }
      );
    }
  },
};
