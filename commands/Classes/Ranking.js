class Ranking {
  xpranking(database, message) {
    let i = 1;
    database
      .collection("Usuarios")
      .doc(message.guild.id)
      .collection("Usuarios")
      .orderBy("level", "desc")
      .orderBy("xp", "desc")
      .limit(5)
      .get()
      .then(function (querySnapshot) {
        let arrAux = [];
        querySnapshot.forEach(function (documentSnapshot) {
          arrAux.push(
            `${i}: ${documentSnapshot.data().name} (level: ${
              documentSnapshot.data().level+1
            }, xp: ${documentSnapshot.data().xp})\n`
          );
          i++;
        });
        message.channel.send({
          embed: {
            color: "0099ff",
            title: "Ranking de XP (do servidor)",
            description: arrAux.join(" ").toString(),
          },
        });
      });
  }

  moneyranking(database, message) {
    let i = 1;
    database
      .collection("Usuarios")
      .doc(message.guild.id)
      .collection("Usuarios")
      .orderBy("money", "desc")
      .limit(5)
      .get()
      .then(function (querySnapshot) {
        let arrAux = [];
        querySnapshot.forEach(function (documentSnapshot) {
          arrAux.push(
            `${i}: ${documentSnapshot.data().name} (moedas: ${
              documentSnapshot.data().money})\n`
          );
          i++;
        });
        message.channel.send({
          embed: {
            color: "ffd700",
            title: "Ranking de Moedas (do servidor)",
            description: arrAux.join(" ").toString(),
          },
        });
      });
  }

  // rankposition(message) {
  //   let pos = 0;

  //   leveling
  //     .Leaderboard({
  //       limit: 1000,
  //     })
  //     .then(async (users) => {
  //       for (let i = 0; i < users.length; i++) {
  //         if (message.author.id == users[i].userid) {
  //           pos = i + 1;
  //         }
  //       }

  //       if (pos == 0) {
  //         message.reply("você ainda não está no ranking =/");
  //       } else {
  //         message.reply("você está em " + pos + "º do ranking.");
  //       }
  //     });
  // }
}

module.exports = new Ranking();
