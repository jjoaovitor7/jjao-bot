const { MessageEmbed } = require("discord.js");
const { doc, updateDoc, deleteField, getDoc } = require("firebase/firestore");

class Utils {
  bitcoinprice(message, args) {
    if (args[0] == null || args[0] == "" || args[0] == " ") {
      message.channel.send(
        "Tente `jj bitcoinprice BRL` ou `jj bitcoinprice USD`."
      );
    } else if (args[0] == "BRL") {
      const axios = require("axios");

      axios
        .get("https://blockchain.info/ticker")
        .then(function (response) {
          message.channel.send({
            embeds: [
              new MessageEmbed()
                .setDescription(`:moneybag: Preço do Bitcoin (em R$)\nR$ ${response.data.BRL.buy}`)
                .setFooter({ "text": "https://blockchain.info/ticker" })]
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () { });
    } else if (args[0] == "USD") {
      const axios = require("axios");

      axios
        .get("https://blockchain.info/ticker")
        .then(function (response) {
          message.channel.send({
            embeds: [
              new MessageEmbed()
                .setDescription(`:moneybag: Preço do Bitcoin (em $)\n$ ${response.data.USD.buy}`)
                .setFooter({ "text": "https://blockchain.info/ticker" })
            ]
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () { });
    } else {
      message.channel.send(
        "Só estão disponíveis as opções BRL e USD. \n`jj bitcoinprice BRL` ou `jj bitcoinprice USD`."
      );
    }
  }

  help(message) {
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Comandos")
          // .setDescription("**[top.gg](https://top.gg/bot/777665289793437759)**")
          .addFields(
            {
              name: "Geral",
              value: `\`jj avatar\`
\`jj avatar2braille\`
\`jj bitcoinprice\`
\`jj botinfo\`
\`jj countcommands\`
\`jj discord\`
\`jj donate\`
\`jj github\`
\`jj help\`
\`jj invite\`
\`jj ping\`
\`jj serverinfo\`
`,
              inline: true,
            },
            {
              name: "Entretenimento",
              value: `\`jj avatar2pixel\`
\`jj blackjack\`
\`jj clap\`
\`jj cookie\`
\`jj jokenpo\`
\`jj risitas\`
\`jj rndnote\`
\`jj sadcat\`
\`jj snake\`
\`jj word2ascii\`
`,
              inline: true,
            },
            {
              name: "Leveling e Economia",
              value: `\`jj coinsranking\`
\`jj [daily | weekly | monthly]\`
\`jj disablelevelingchannel\`
\`jj profile\`
\`jj profilecard\`
\`jj setlevelingchannel\`
\`jj transfer\`
\`jj xpranking\`
`,
              inline: true,
            },
            {
              name: "Cargos",
              value: `\`jj createrole [role]\`
\`jj enterrole [role]\`
\`jj deleterole [role]\`
\`jj setinrole [user] [role]\`
\`jj exitrole [role]\`
`,
              inline: true,
            }
          )
      ]
    });
  }

  invite(message) {
    message.channel.send(
      "https://discord.com/oauth2/authorize?client_id=777665289793437759&permissions=3156032&scope=bot"
    );
  }

  ping(client, message) {
    const ping = Date.now() - message.createdTimestamp;
    const pingbot = Math.round(client.ws.ping);

    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle(":ping_pong:Pong!")
          .addFields(
            { name: "Ping", value: `${ping}ms`, inline: true },
            { name: "API Ping", value: `${pingbot}ms`, inline: true }
          )]
    }
    );
  }

  // Networks
  discord(message) {
    message.channel.send("https://discord.gg/zz2MSDWk9a");
  }

  github(message) {
    message.channel.send("https://github.com/jjoaovitor7/jjao-bot");
  }

  kofi(message) {
    message.channel.send("https://ko-fi.com/jjoaovitor7");
  }

  async xpranking(message, leveling) {
    const arr = await leveling.levelingranking(message, 5);
    message.channel.send({
      embeds: [
        new MessageEmbed()
        .setColor("0099ff")
        .setTitle("Ranking de XP (do servidor)")
        .setDescription(arr.join(" ").toString())
      ]
    });
  }
}

module.exports = new Utils();
