const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const QuickChart = require("quickchart-js");
const moment = require("moment");
const { prefix } = require("../../config");

class Utils {
  bitcoinprice(message, args) {
    if (args[0] == null || args[0].trim() == "") {
      message.channel.send(`Tente \`${prefix} bitcoinprice BRL\` ou \`${prefix} bitcoinprice USD\`.`);
    }

    let currency = ["BRL", "R$"];
    switch (args[0]) {
      case "BRL":
        currency[0] = "BRL";
        currency[1] = "R$";
        break;
      case "USD":
        currency[0] = "USD";
        currency[1] = "$";
        break;
    }

    axios
      .get("https://blockchain.info/ticker")
      .then((response) => {
        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle(":moneybag: Preço do Bitcoin")
              .setDescription(`${currency[1]} ${response.data[currency[0]].buy}`)
              .setFooter({ "text": "https://blockchain.info/ticker" })]
        });
      }).catch(console.error);
  }

  botinfo(client, message) {
    const duration = moment.duration(client.uptime).format("D[dia(s)], H[hora(s)], m[min], s[s]");
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
            { name: "Uso de memória", value: Math.round(memoryUsed * 100) / 100 + "MB", inline: true },
            { name: "Uptime", value: duration, inline: true },
            { name: "Invite", value: `[URL](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=2147609664&scope=bot)`, inline: true },
            { name: "Repositório", value: "[URL](https://github.com/jjoaovitor7/jjao-bot)", inline: true }
          ).setFooter({ "text": `ID: ${client.user.id}` }).setTimestamp()
      ]
    });

  }

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
          .setDescription("obs.: Quando o bot é reiniciado a quantidade é zerada.")
          .setImage(chart.getUrl())
      ]
    });
  }

  help(message) {
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Comandos")
          .addFields(
            {
              name: "Geral",
              value: `\`\`\`${prefix} avatar
${prefix} bitcoinprice [BRL | USD]
${prefix} botinfo | serverinfo
${prefix} countcommands
${prefix} discord
${prefix} help
${prefix} ping
\`\`\`
`,
              inline: true,
            },
            {
              name: "Entretenimento",
              value: `\`\`\`${prefix} avatar2pixel
${prefix} blackjack
${prefix} cookie
${prefix} jokenpo
${prefix} rndnote
${prefix} snake
${prefix} word2ascii
\`\`\`
`,
              inline: true,
            },
            {
              name: "Leveling e Economia",
              value: `\`\`\`${prefix} coinsranking | xpranking
${prefix} daily | weekly | monthly
${prefix} setlevelingchannel | disablelevelingchannel
${prefix} profile | profilecard
${prefix} transfer
\`\`\`
`,
            }
          )
      ]
    });
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

  networks(message, network) {
    switch (network) {
      case "discord":
        message.channel.send("https://discord.gg/zz2MSDWk9a");
        break;
    }
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
          .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png?size=1024`)
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

  async xpranking(message, leveling) {
    const arr = await leveling.ranking(message, 5);
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