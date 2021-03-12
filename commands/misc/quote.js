const { embedColor } = require("../../configs/config.json");
const discord = require("discord.js");
const { misc } = require("../../configs/commands.json");
const axios = require("axios");
module.exports = {
  name: "quote",
  category: "misc",
  description: "Motivational Quotes",
  callback: async ({ message, args }) => {
    if (misc.quote) {
      axios.get("https://type.fit/api/quotes").then((res) => {
        let datalen = res.data;
        //   console.log(datalen);
        let num = Math.floor(Math.random() * datalen.length);
        //   console.log(num);
        let { text, author } = datalen[num];

        const quoteEmbed = new discord.MessageEmbed()
          .setAuthor("Quotes")
          .setDescription(`${text}\n-${author}`)
          .setColor(embedColor);
        message.channel.send(quoteEmbed);
      });
    }
  },
};
