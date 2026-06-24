import { EmbedBuilder, Client, Message } from "discord.js";
import QuickChart from "quickchart-js";
import moment from "moment";
import "moment-duration-format";
import { prefix } from "../../config";
const DISCORD_INVITE = "https://discord.gg/zz2MSDWk9a";

class Utils {
  bitcoinprice(message: Message<true>, args: string[]) {
    if (!args[0]?.trim()) {
      message.channel.send(
        `Tente \`${prefix} bitcoinprice BRL\` ou \`${prefix} bitcoinprice USD\`.`
      );
      return;
    }

    const currency: Record<string, [string, string]> = {
      BRL: ["BRL", "R$"],
      USD: ["USD", "$"],
    };
    const cur = currency[args[0].toUpperCase()] ?? currency.BRL;

    fetch("https://blockchain.info/ticker")
      .then((r) => r.json())
      .then((data) => {
        message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle(":moneybag: Preço do Bitcoin")
              .setDescription(`${cur[1]} ${data[cur[0]].buy}`)
              .setFooter({ text: "https://blockchain.info/ticker" }),
          ],
        });
      })
      .catch(console.log);
  }

  botinfo(client: Client, message: Message<true>) {
    const duration = (moment.duration(client.uptime) as any)
      .format("D[dia(s)], H[hora(s)], m[min], s[s]");
    const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle("Informações do Bot")
          .addFields(
            { name: "Usuários", value: String(client.users.cache.size), inline: true },
            { name: "Servidores", value: String(client.guilds.cache.size), inline: true },
            { name: "Criado em", value: "15 nov. 2020", inline: true },
            { name: "Uso de memória", value: Math.round(memoryUsed * 100) / 100 + "MB", inline: true },
            { name: "Uptime", value: duration, inline: true },
            { name: "Invite", value: `[URL](https://discord.com/oauth2/authorize?client_id=${client.user!.id}&permissions=2147609664&scope=bot)`, inline: true },
            { name: "Repositório", value: "[URL](https://github.com/jjoaovitor7/jjao-bot)", inline: true },
            { name: "Doação", value: "[Ko-fi](https://ko-fi.com/jjoaovitor7)", inline: true },
            { name: "\u200b", value: "\u200b", inline: true },
          )
          .setFooter({ text: `ID: ${client.user!.id}` })
          .setTimestamp(),
      ],
    });
  }

  countCommands(message: Message<true>, countCommands: Record<string, number>) {
    const labels = Object.keys(countCommands);
    const values = Object.values(countCommands);

    const chart = new QuickChart()
      .setConfig({
        type: "horizontalBar",
        data: {
          labels,
          datasets: [{ label: "Quantidade de Uso de Comandos (Geral)", data: values, backgroundColor: "#006400" }],
        },
        options: {
          scales: { xAxes: [{ display: true, ticks: { beginAtZero: true } }] },
        },
      })
      .setWidth(800)
      .setHeight(1024);

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("Quantidade de Uso de Comandos")
          .setDescription("obs.: Quando o bot é reiniciado a quantidade é zerada.")
          .setImage(chart.getUrl()),
      ],
    });
  }

  help(message: Message<true>) {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle("Comandos")
          .setFooter({ text: "É possível apoiar em https://ko-fi.com/jjoaovitor7 =)" })
          .addFields(
            {
              name: "Geral",
              value: `\`\`\`${prefix} avatar\n${prefix} bitcoinprice [BRL | USD]\n${prefix} botinfo | serverinfo\n${prefix} countcommands\n${prefix} discord\n${prefix} help\n${prefix} ping\n${prefix} worldcup [group | team]\n\`\`\`\n`,
              inline: true,
            },
            {
              name: "Entretenimento",
              value: `\`\`\`${prefix} avatar2pixel\n${prefix} blackjack\n${prefix} cookie\n${prefix} jokenpo\n${prefix} rndnote\n${prefix} snake\n${prefix} word2ascii\n\`\`\`\n`,
              inline: true,
            },
            {
              name: "Leveling e Economia",
              value: `\`\`\`${prefix} coinsranking | xpranking\n${prefix} daily | weekly | monthly\n${prefix} setlevelingchannel | disablelevelingchannel\n${prefix} profile | profilecard\n${prefix} transfer\n\`\`\`\n`,
            }
          ),
      ],
    });
  }

  ping(client: Client, message: Message<true>) {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(":ping_pong:Pong!")
          .addFields(
            { name: "Ping", value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
            { name: "API Ping", value: `${Math.round(client.ws.ping)}ms`, inline: true }
          ),
      ],
    });
  }

  discord(message: Message<true>) {
    message.channel.send(DISCORD_INVITE);
  }

  async serverinfo(message: Message<true>) {
    const members = await message.guild!.members.fetch();
    const users = members.filter((m) => !m.user.bot);
    const bots = members.filter((m) => m.user.bot);

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTimestamp()
          .setTitle(message.guild!.name)
          .setThumbnail(
            `https://cdn.discordapp.com/icons/${message.guild!.id}/${message.guild!.icon}.png?size=1024`
          )
          .addFields(
            { name: "Região do Servidor", value: message.guild!.preferredLocale, inline: true },
            { name: "Usuários", value: String(users.size), inline: true },
            { name: "Bots", value: String(bots.size), inline: true },
            { name: "Criado em", value: moment(message.guild!.createdAt).format("LL") },
          )
          .setFooter({ text: `ID: ${message.guild!.id}` }),
      ],
    });
  }

  async xpranking(message: Message<true>, leveling: any) {
    const arr = await leveling.ranking(message, 5);
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle("Ranking de XP (do servidor)")
          .setDescription(arr.join(" ")),
      ],
    });
  }
}

export default new Utils();
