const { MessageEmbed } = require("discord.js");
const moment = require("moment");

const { collection, doc, limit, orderBy, query, getDoc, getDocs, updateDoc } = require("firebase/firestore");

class Balance {
  async checkToAdd(database, message, type, text) {
    const guild = doc(database, "Usuarios", message.guild.id);
    const member = doc(guild, "Usuarios", message.author.id);
    const member_doc = await getDoc(member);

    let time = member_doc.data();
    time = time[type];

    if (Date.now() < time) {
      moment.locale("pt-br");
      const duration = moment(time).format("lll");
      message.reply(`Poderá pegar novamente em ${duration}.`);
    } else {
      const amount = Math.floor(Math.random() * 55) + 1;
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("#0099ff")
            .addFields({ name: `Moedas (${text})`, value: `${amount} moedas.` })
        ]
      });

      switch (type) {
        case "daily":
          updateDoc(member, {
            money: member_doc.data().money + amount,
            daily: Date.now() + 86400000,
          });
          break;
        case "weekly":
          updateDoc(member, {
            money: member_doc.data().money + amount,
            weekly: Date.now() + 604800000,
          });
          break;
        case "monthly":
          updateDoc(member, {
            money: member_doc.data().money + amount,
            monthly: Date.now() + 2592000000,
          });
          break;
      }
    }
  }

  async moneyranking(database, message) {
    const guild = collection(database, "Usuarios", message.guild.id, "Usuarios");
    const docs_filter = query(guild, limit(5), orderBy("money", "desc"));
    const docs = await getDocs(docs_filter);
    let arr = [];

    for (let i = 0; i < docs.size; i++) {
      arr.push(`${i + 1}: ${docs.docs[i].data().name} (moedas: ${docs.docs[i].data().money})\n`);
    }

    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("ffd700")
          .setTitle("Ranking de Moedas (do servidor)")
          .setDescription(arr.join(" ").toString())
      ]
    });
  }

  async transfer(database, message, args) {
    let toTransfer = message.mentions.users.first();
    args[0] = parseInt(args[0]);
    if (
      args[0] != "" &&
      args[0] > 0 &&
      toTransfer != undefined &&
      toTransfer != message.author.id &&
      toTransfer.bot == false &&
      Number.isInteger(args[0])
    ) {
      const guild = doc(database, "Usuarios", message.guild.id);
      const user = doc(guild, "Usuarios", message.author.id);
      const user_doc = await getDoc(user);
      const otheruser = doc(guild, "Usuarios", toTransfer.id);
      const otheruser_doc = await getDoc(otheruser);

      if (args[0] <= user_doc.data().money) {
        updateDoc(user, {
          money: user_doc.data().money - args[0],
        }).then(() => {
          updateDoc(otheruser, {
            money: otheruser_doc.data().money + args[0],
          }).then(() => {
            message.channel.send(
              `Transferência de \`${parseInt(
                args[0]
              )} moeda(s)\` concluída.`
            );
          });
        })
      } else {
        message.reply("você não possui essa quantia de moedas.");
      }
    } else {
      message.channel.send("Tente \`jj transfer [quantia] [usuario]\`.");
    }
  }
}

module.exports = new Balance();
