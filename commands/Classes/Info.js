const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const QuickChart = require("quickchart-js");

class Info {
  botinfo(client, message) {
    const duration = moment.duration(client.uptime)
      .format("D[dia(s)], H[hora(s)], m[min], s[s]");
    const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;

    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Informações do Bot")
          .addFields(
            { name: "Usuários", value: String(client.users.cache.size), inline: true },
            { name: "Servidores", value: String(client.guilds.cache.size), inline: true },
            { name: "Criado em", value: "15 nov. 2020", inline: true },
            {
              name: "Uso de memória",
              value: Math.round(memoryUsed * 100) / 100 + "MB",
              inline: true
            },
            { name: "Uptime", value: duration, inline: true }
          )
          .setFooter({ "text": `ID: ${client.user.id}` })
          .setTimestamp()
      ]
    });

  }

  async serverinfo(message) {
    const members = await message.guild.members.fetch();
    const users = members.filter(member => !member.user.bot);
    const bots = members.filter(member => member.user.bot);
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setTimestamp()
          .setTitle(`${message.guild.name}`)
          .setThumbnail(
            "https://cdn.discordapp.com/icons/" +
            message.guild.id +
            "/" +
            message.guild.icon +
            ".png?size=1024"
          )
          .addFields(
            { name: "Região do Servidor", value: message.guild.preferredLocale, inline: true },
            { name: "Usuários", value: String(users.size), inline: true },
            { name: "Bots", value: String(bots.size), inline: true },
            { name: "Criado em", value: moment(message.guild.createdAt).format("LL") }
          )
          .setFooter({ "text": `ID: ${message.guild.id}` })
      ]
    });
  }

  // userinfo(message) {
  //   message.channel.send({embeds: [
  //     new MessageEmbed()
  //       .setTimestamp()
  //       .setTitle(`${message.author.username}#${message.author.discriminator}`)
  //       .setThumbnail(
  //         "https://cdn.discordapp.com/icons/" +
  //           message.author.id +
  //           "/" +
  //           message.author.avatar +
  //           ".png?size=1024"
  //       )
  //       .addFields({name: "Criado em", value: moment.utc(message.author.createdAt).format("LL")})
  //       .setFooter({"text": `ID: ${message.author.id}`})
  //   ]});
  // }

  countCommands(message, countCommands) {
    let data_command = [];
    let data_value = [];
    for (let command in countCommands) {
      data_command.push(command);
      data_value.push(parseInt(countCommands[command]));
    }

    let chart = new QuickChart();
    chart
      .setConfig({
        type: "horizontalBar",
        data: {
          labels: data_command,
          datasets: [
            {
              label: "Quantidade de Uso de Comandos (Geral)",
              data: data_value,
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
      embeds: [
        new MessageEmbed().setTitle("Quantidade de Uso de Comandos")
        .setDescription("obs.:\nquando o bot é desligado ou reiniciado\n a quantidade é zerada.")
        .setImage(chart.getUrl())
      ]
    });
  }
}

module.exports = new Info();
