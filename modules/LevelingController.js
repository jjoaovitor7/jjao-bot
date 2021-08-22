class LevelingController {
  createUserInDB(message, docRef, _docRef) {
    _docRef.set({ name: message.guild.name });
    docRef
      .set({
        id: message.author.id,
        name: message.author.username + "#" + message.author.discriminator,
        xp: 0,
        level: 0,
        money: 0,
        daily: 0,
        weekly: 0,
        monthly: 0,
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  setLevel(client, message, database, docSnapshot, docRef) {
    const _docLevelUp = database
      .collection("LevelUpChannel")
      .doc(message.guild.id);

    // BEGIN - se o xp for maior do que o level * 100
    if (docSnapshot.data().xp >= (docSnapshot.data().level + 1) * 100) {
      docRef
        .update({
          xp: 0,
          level: docSnapshot.data().level + 1,
        })
        .then(function () {
          _docLevelUp.get().then((docLevelUp) => {
            if (docLevelUp.exists) {
              _docLevelUp
                .collection("Channel")
                .get()
                .then((querySnapshot) => {
                  if (!querySnapshot.empty) {
                    const query = querySnapshot.docs[0];
                    const channel = client.channels.cache.find(
                      (channel) => channel.id === query.id
                    );

                    docRef.get().then((docSnapshot) => {
                      channel.send(
                        `<@${
                          message.author.id
                        }>, passou de nível! Agora ele é level ${
                          docSnapshot.data().level + 1
                        }!`
                      );
                    });
                  }
                });
            } else {
              docRef.get().then((_docSnapshotLevelUpReply) => {
                message.reply(
                  `você subiu de nível! Agora você é level ${
                    _docSnapshotLevelUpReply.data().level + 1
                  }.`
                );
              });
            }
          });
        })
        .catch(function (error) {
          console.error(error);
          console.log("Erro!");
        });
    } // END - se o xp for maior do que o level * 100

    // BEGIN - caso não seja, continue atualizando o xp
    else {
      docRef
        .update({
          xp: docSnapshot.data().xp + 5,
          level: docSnapshot.data().level,
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    // END - caso não seja, continue atualizando o xp
  }

  leveling(client, database, message) {
    const _docRef = database.collection("Usuarios").doc(message.guild.id);
    const docRef = _docRef.collection("Usuarios").doc(message.author.id);

    docRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        this.setLevel(client, message, database, docSnapshot, docRef, _docRef);
      } else {
        this.createUserInDB(message, docRef, _docRef);
      }
    });
  }
}

module.exports = new LevelingController();
