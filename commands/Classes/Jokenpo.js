class Jokenpo {
  play(database, client, message, args) {
    if (args == "") {
      message.channel.send(
        "Tente .jokenpo `[pedra|papel|tesoura]`.\nex.: `.jokenpo pedra`"
      );
    } else {
      const options = ["pedra", "papel", "tesoura"];

      // pedra
      if (args[0] == options[0]) {
        let optionBot = options[Math.floor(Math.random() * 3)];
        message.channel.send(optionBot);
        if (optionBot == "pedra") {
          message.channel.send("Empate");
        }

        if (optionBot == "papel") {
          message.channel.send(`<@${client.user.id}> ganhou.`);
          let random = Math.floor(Math.random() * 6 + 1);
          message.channel.send(`Você perdeu \`${random} coins\`!`);
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
                  .doc(documentSnapshot.id).update({money: documentSnapshot.data().money - random});
              });
            });
        }

        if (optionBot == "tesoura") {
          message.channel.send(`<@${message.author.id}> ganhou.`);
          let random = Math.floor(Math.random() * 11 + 1);
          message.channel.send(`Você ganhou \`${random} coins\`!`);
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
                  .doc(documentSnapshot.id).update({money: documentSnapshot.data().money + random});
              });
            });
        }
      }

      // papel
      else if (args[0] == options[1]) {
        let optionBot = options[Math.floor(Math.random() * 3)];
        message.channel.send(optionBot);
        if (optionBot == "pedra") {
          message.channel.send(`<@${message.author.id}> ganhou.`);
          let random = Math.floor(Math.random() * 11 + 1);
          message.channel.send(`Você ganhou \`${random} coins\`!`);
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
                  .doc(documentSnapshot.id).update({money: documentSnapshot.data().money + random});
              });
            });
        }

        if (optionBot == "papel") {
          message.channel.send("Empate");
        }

        if (optionBot == "tesoura") {
          message.channel.send(`<@${client.user.id}> ganhou.`);
          let random = Math.floor(Math.random() * 6 + 1);
          message.channel.send(`Você perdeu \`${random} coins\`!`);
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
                  .doc(documentSnapshot.id).update({money: documentSnapshot.data().money - random});
              });
            });
        }
      }

      // tesoura
      else if (args[0] == options[2]) {
        let optionBot = options[Math.floor(Math.random() * 3)];
        message.channel.send(optionBot);
        if (optionBot == "pedra") {
          message.channel.send(`<@${client.user.id}> ganhou.`);
          let random = Math.floor(Math.random() * 6 + 1);
          message.channel.send(`Você perdeu \`${random} coins\`!`);
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
                  .doc(documentSnapshot.id).update({money: documentSnapshot.data().money - random});
              });
            });
        }

        if (optionBot == "papel") {
          message.channel.send(`<@${message.author.id}> ganhou.`);
          let random = Math.floor(Math.random() * 11 + 1);
          message.channel.send(`Você ganhou \`${random} coins\`!`);
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
                  .doc(documentSnapshot.id).update({money: documentSnapshot.data().money + random});
              });
            });
        }

        if (optionBot == "tesoura") {
          message.channel.send("Empate");
        }
      } else {
        message.channel.send(
          "Tente .jokenpo `[pedra|papel|tesoura]`.\nex.: `.jokenpo pedra`"
        );
      }
    }
  }
}

module.exports = new Jokenpo();
