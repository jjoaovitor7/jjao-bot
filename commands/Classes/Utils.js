const Discord = require("discord.js");

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
            embed: {
              description:
                ":moneybag: Preço do Bitcoin (em R$)\nR$ " +
                response.data.BRL.buy,
              footer: {
                text: "https://blockchain.info/ticker",
              },
            },
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    } else if (args[0] == "USD") {
      const axios = require("axios");

      axios
        .get("https://blockchain.info/ticker")
        .then(function (response) {
          message.channel.send({
            embed: {
              description:
                ":moneybag: Preço do Bitcoin (em $)\n$ " +
                response.data.USD.buy,
              footer: {
                text: "https://blockchain.info/ticker",
              },
            },
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    } else {
      message.channel.send(
        "Só estão disponíveis as opções BRL e USD. \n`jj bitcoinprice BRL` ou `jj bitcoinprice USD`."
      );
    }
  }

  help(message) {
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Comandos")
        // .setDescription("**[top.gg](https://top.gg/bot/777665289793437759)**")
        .addFields(
          {
            name: "Geral",
            value: `\`jj avatar\`
\`jj avatar2braille\`
\`jj avatar2circle\`
\`jj avatar2pixel\`
\`jj deletelevelupchannel\`
\`jj discord\`
\`jj donate\`
\`jj github\`
\`jj invite\`
\`jj setlevelupchannel\`
`,
            inline: true,
          },
          {
            name: "Entretenimento",
            value: `\`jj clap\`
\`jj cookie\`
\`jj jokenpo\`
\`jj rndimg\`
\`jj rndnote\`
\`jj sadcat\`
\`jj risitas\`
\`jj word2ascii\`
`,
            inline: true,
          },
          {
            name: "Info",
            value: `\`jj bitcoinprice\`
\`jj botinfo\`
\`jj brazilcovidcases\`
\`jj help\`
\`jj ping\`
\`jj profile\`
\`jj profilecard\`
\`jj serverinfo\`
\`jj countcommands\`
`,
            inline: true,
          },
          {
            name: "Leveling e Economia",
            value: `\`jj coinsranking\`
\`jj daily | weekly | monthly \`
\`jj xpranking\`
`,
            inline: true,
          },
          {
            name: "Cargos",
            value: `\`jj createrole [role]\`
\`jj enterrole [role]\`
\`jj setinrole [user] [role]\`
\`jj exitrole [role]\`
\`jj deleterole [role]\`
`,
            inline: true,
          }
        )
    );
  }

  invite(message) {
    message.channel.send(
      "https://discord.com/oauth2/authorize?client_id=777665289793437759&permissions=3156032&scope=bot"
    );
  }

  ping(client, message) {
    let ping = new Date().getTime() - message.createdTimestamp;
    let pingbot = Math.round(client.ws.ping);

    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(":ping_pong:Pong!")
        .addFields(
          { name: "Ping", value: `${ping}ms`, inline: true },
          { name: "API Ping", value: `${pingbot}ms`, inline: true }
        )
    );
  }

  setLevelUpChannel(database, message) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      let channel = message.mentions.channels;

      let channelAux = channel.map(
        (channel_aux) =>
          new Object({
            id: channel_aux.id,
          })
      );

      if (channelAux.length == 1) {
        let docReferenceAux = database
          .collection("LevelUpChannel")
          .doc(message.guild.id);

        docReferenceAux.get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            message.channel.send(
              "Já existe um canal de level-up setado nesse servidor!"
            );
          } else {
            docReferenceAux.set({ name: message.guild.name });

            docReferenceAux
              .collection("Channel")
              .doc(channelAux[0].id)
              .set({ channelexists: true });
            message.channel.send(
              `Canal <#${channelAux[0].id}> setado como canal de level-up!`
            );
          }
        });
      } else {
        message.channel.send("Você precisa marcar o canal.");
      }
    } else {
      message.channel.send("Somente administradores podem usar esse comando.");
    }
  }

  deleteLevelUpChannel(database, message) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      database
        .collection("LevelUpChannel")
        .doc(message.guild.id)
        .collection("Channel")
        .orderBy("channelexists")
        .limit(1)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const queryDocumentSnapshot = querySnapshot.docs[0];
            queryDocumentSnapshot.ref.delete();
            database
              .collection("LevelUpChannel")
              .doc(message.guild.id)
              .delete();
            message.channel.send("Canal de level-up deletado do sistema.");
          } else {
            message.channel.send(
              "Tem certeza que existe canal de level-up setado nesse servidor?"
            );
          }
        });
    } else {
      message.channel.send("Somente administradores podem usar esse comando.");
    }
  }
}

module.exports = new Utils();
