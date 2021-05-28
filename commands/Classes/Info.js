const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

class Info {
  botinfo(client, message) {
    let duration = moment
      .duration(client.uptime)
      .format("D[dia(s)], H[hora(s)], m[min], s[s]");
    let memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;

    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Informações do Bot")
        .addField("Usuários", client.users.cache.size, true)
        .addField("Servidores", client.guilds.cache.size, true)
        .addField("Criado em", "15 nov. 2020", true)
        .addField(
          "Uso de memória",
          Math.round(memoryUsed * 100) / 100 + "MB",
          true
        )
        .addField("Uptime", duration, true)
        .setFooter(`ID: ${client.user.id}`)
        .setTimestamp()
    );
  }

  serverinfo(message) {
    message.channel.send(
      new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle(`${message.guild.name}`)
        .setThumbnail(
          "https://cdn.discordapp.com/icons/" +
            message.guild.id +
            "/" +
            message.guild.icon +
            ".png?size=1024"
        )
        .addField("Região do Servidor", message.guild.region, true)
        .addField("Membros", message.guild.memberCount, true)
        .addField("Criado em", moment(message.guild.createdAt).format("LL"))
        .setFooter(`ID: ${message.guild.id}`)
    );
  }

  // userinfo(message) {
  //   message.channel.send(
  //     new Discord.MessageEmbed()
  //       .setTimestamp()
  //       .setTitle(`${message.author.username}#${message.author.discriminator}`)
  //       .setThumbnail(
  //         "https://cdn.discordapp.com/icons/" +
  //           message.author.id +
  //           "/" +
  //           message.author.avatar +
  //           ".png?size=1024"
  //       )
  //       .addField(
  //         "Criado em",
  //         moment.utc(message.author.createdAt).format("LL")
  //       )
  //       .setFooter(`ID: ${message.author.id}`)
  //   );
  // }

  covidbrazilcases(message) {
    const axios = require("axios");

    axios
      .get("https://covid19-brazil-api.now.sh/api/report/v1")
      .then(function (response) {
        let arrCovid = [];
        for (let i = 0; i < response.data.data.length; i++) {
          arrCovid.push(
            response.data.data[i].state +
              ": " +
              response.data.data[i].cases +
              "\n"
          );
        }
        message.channel.send({
          embed: {
            title: ":syringe: Casos de COVID-19 no Brasil (por estado)",
            description: arrCovid.sort().join("").toString(),
            footer: {
              text: "https://covid19-brazil-api.now.sh/api/report/v1",
            },
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

module.exports = new Info();
