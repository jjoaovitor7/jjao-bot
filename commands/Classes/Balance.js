// const { MessageEmbed } = require("discord.js");
// const ms = require("parse-ms");
const { doc, getDoc, updateDoc } = require("firebase/firestore");

// async function addBonus(database, message, type) {
//   let qtde = Math.floor(Math.random() * 50) + 1;
//   message.channel.send({embeds: [
//     new MessageEmbed()
//       .setColor("#0099ff")
//       .addField(`Moedas do ${type}`, qtde + " moedas.")
//   ]});

//   const guild = doc(database, "Usuarios", message.guild.id);
//   const user = doc(guild, "Usuarios", message.author.id);
//   const user_doc = await getDoc(user);

//   updateDoc(user, {
//     money: user_doc.data().money + qtde,
//     daily: Date.now(),
//   });
// }

// const timeout = {
//     "day": 86400000,
//     "week": 604800000,
//     "month": 2592000000,
// }

class Balance {
  async #getUser(database, message) {
    const guild = doc(database, "Usuarios", message.guild.id);
    const member = doc(guild, "Usuarios", message.author.id);
    const member_doc = await getDoc(member);
    return member_doc.data();
  }

  // async daily(database, message) {
  //   let data = await this.#getUser(database, message);
  //   let daily = data.daily;

  //   const calc = timeout.day - (Date.now() - daily);
  //   if (daily != 0 && calc > 0) {
  //     let time = ms(calc);
  //     message.reply(
  //       `você já pegou suas moedas do dia.\nVocê precisa esperar ${time.hours}h ${time.minutes}m ${time.seconds}s para poder pegar novamente.`
  //     );
  //   } else {
  //     addBonus(database, message, "Dia");
  //   }
  // }

  // async weekly(database, message) {
  //   let data = await this.#getUser(database, message);
  //   let weekly = data.weekly;

  //   const calc = timeout.week - (Date.now() - daily);
  //   if (weekly != 0 && calc > 0) {
  //     let time = ms(calc);
  //     message.reply(
  //       `você já pegou suas moedas da semana.\nVocê precisa esperar ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s para poder pegar novamente.`
  //     );
  //   } else {
  //     addBonus(database, message, "Semana");
  //   }
  // }

  // async monthly(database, message) {
  //   let data = await this.#getUser(database, message);
  //   let monthly = data.monthly;

  //   let calc = timeout.month - (Date.now() - monthly);
  //   if (monthly != 0 &&  calc > 0) {
  //     let time = ms(calc);
  //     message.reply(
  //       `você já pegou suas moedas do mês.\nVocê precisa esperar ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s para poder pegar novamente.`
  //     );
  //   } else {
  //     addBonus(database, message, "Mês");
  //   }
  // }

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
