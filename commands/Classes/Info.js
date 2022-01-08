const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const QuickChart = require("quickchart-js");

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

  countCommands(message, countCommands) {
    let auxGraph1 = [];
    let auxGraph2 = [];
    for (let command in countCommands) {
      auxGraph1.push(command);
      auxGraph2.push(parseInt(countCommands[command]));
    }

    let chart = new QuickChart();
    chart
      .setConfig({
        type: "horizontalBar",
        data: {
          labels: auxGraph1,
          datasets: [
            {
              label: "Quantidade de Uso de Comandos (Geral)",
              data: auxGraph2,
              backgroundColor: "#006400",
            },
          ],
        },
        options: {
          scales: {
            xAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                  // max: 100,
                  // min: 0,
                },
              },
            ],
          },
        },
      })
      .setWidth(800)
      .setHeight(1024);

    message.channel.send({
      embed: {
        title: "Quantidade de Uso de Comandos",
        description:
          "obs.:\nquando o bot é desligado ou reiniciado\n a quantidade é zerada.",
        image: {
          url: chart.getUrl(),
        },
      },
    });
  }
}

module.exports = new Info();
