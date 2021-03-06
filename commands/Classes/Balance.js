const Discord = require("discord.js");
const ms = require("parse-ms");

function getDocUser(database, message, userinfo) {
  return database
    .collection("Usuarios")
    .doc(message.guild.id)
    .collection("Usuarios")
    .where("id", "==", userinfo.id)
    .get();
}

function getData(database, message) {
  return getDocUser(database, message, message.author).then(function (
    querySnapshot
  ) {
    let profile;
    querySnapshot.forEach(function (documentSnapshot) {
      profile = documentSnapshot.data();
    });
    return profile;
  });
}

function addBonus(database, message, type) {
  let qtde = Math.floor(Math.random() * 50) + 1;
  message.channel.send(
    new Discord.MessageEmbed()
      .setColor("#0099ff")
      .addField(`Moedas do ${type}`, qtde + " moedas.")
  );
  database
    .collection("Usuarios")
    .doc(message.guild.id)
    .collection("Usuarios")
    .where("id", "==", message.author.id)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (documentSnapshot) {
        database
          .collection("Usuarios")
          .doc(message.guild.id)
          .collection("Usuarios")
          .doc(documentSnapshot.id)
          .update({ money: documentSnapshot.data().money + qtde });
      });
    });
  database
    .collection("Usuarios")
    .doc(message.guild.id)
    .collection("Usuarios")
    .where("id", "==", message.author.id)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (documentSnapshot) {
        database
          .collection("Usuarios")
          .doc(message.guild.id)
          .collection("Usuarios")
          .doc(documentSnapshot.id)
          .update({ daily: Date.now() });
      });
    });
}

class Balance {
  async daily(database, message) {
    const timeout = 86400000; // 24 horas em milisegundos
    let data = await getData(database, message);
    let daily = data.daily;

    let dailyAux = daily;
    if (dailyAux != 0 && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));
      message.reply(
        `você já pegou suas moedas do dia.\nVocê precisa esperar ${time.hours}h ${time.minutes}m ${time.seconds}s para poder pegar novamente.`
      );
    } else {
      addBonus(database, message, "Dia");
    }
  }

  async weekly(database, message) {
    const timeout = 604800000; // 7 dias em milisegundos
    let data = await getData(database, message);
    let weekly = data.weekly;

    let weeklyAux = weekly;
    if (weeklyAux != 0 && timeout - (Date.now() - weekly) > 0) {
      let time = ms(timeout - (Date.now() - weekly));
      message.reply(
        `você já pegou suas moedas da semana.\nVocê precisa esperar ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s para poder pegar novamente.`
      );
    } else {
      addBonus(database, message, "Semana");
    }
  }

  async monthly(database, message) {
    const timeout = 2592000000; // 30 dias em milisegundos
    let data = await getData(database, message);
    let monthly = data.monthly;

    let monthlyAux = monthly;
    if (monthlyAux != 0 && timeout - (Date.now() - monthly) > 0) {
      let time = ms(timeout - (Date.now() - monthly));
      message.reply(
        `você já pegou suas moedas do mês.\nVocê precisa esperar ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s para poder pegar novamente.`
      );
    } else {
      addBonus(database, message, "Mês");
    }
  }
}

module.exports = new Balance();
