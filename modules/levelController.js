function levelController(client, database, message) {
  const docReferenceAux = database.collection("Usuarios").doc(message.guild.id);

  const docReference = docReferenceAux
    .collection("Usuarios")
    .doc(message.author.id);

  docReference.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      if (docSnapshot.data().xp >= (docSnapshot.data().level+1) * 100) {
        docReference
          .update({
            xp: 0,
            level: docSnapshot.data().level + 1,
          })
          .then(function () {
            const docReferenceAuxLevelUp = database
              .collection("LevelUpChannel")
              .doc(message.guild.id);

            docReferenceAuxLevelUp.get().then((docSnapshotLU) => {
              if (docSnapshotLU.exists) {
                docReferenceAuxLevelUp
                  .collection("Channel")
                  .get()
                  .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                      const queryDocumentSnapshot = querySnapshot.docs[0];
                      const channel = client.channels.cache.find(
                        (channel) => channel.id === queryDocumentSnapshot.id
                      );

                      docReference.get().then((docSnapshot) => {
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
                docReference.get().then((docSnapshot) => {
                  message.reply(
                    `você subiu de nível! Agora você é level ${
                      docSnapshot.data().level + 1
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
      } else {
        docReference
          .update({
            xp: docSnapshot.data().xp + 5,
            level: docSnapshot.data().level,
          })
          .then(function () {
            // console.log("Atualizado!");
          })
          .catch(function (error) {
            console.error(error);
            console.log("Erro!");
          });
      }
    } else {
      docReferenceAux.set({ name: message.guild.name });
      docReference
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
        .then(function () {
          console.log("Usuário cadastrado no Banco de Dados.");
        })
        .catch(function (error) {
          console.error(error);
          console.log("Usuário não cadastrado devido a um erro!");
        });
    }
  });
}

module.exports = levelController;
