const { collection, getDocs, limit, orderBy, query } = require("firebase/firestore");

class Ranking {
  async xpranking(database, message) {
    const guild = collection(database, "Usuarios", message.guild.id, "Usuarios");
    const docs_filter = query(guild, limit(5), orderBy("level", "desc"), orderBy("xp", "desc"));
    const docs = await getDocs(docs_filter);
    let arr = [];

    for (let i = 0; i < docs.size; i++) {
      arr.push(`${i + 1}: ${docs.docs[i].data().name} (level: ${docs.docs[i].data().level + 1}, xp: ${docs.docs[i].data().xp})\n`);
    }

    message.channel.send({
      embed: {
        color: "0099ff",
        title: "Ranking de XP (do servidor)",
        description: arr.join(" ").toString(),
      },
    });
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
      embed: {
        color: "ffd700",
        title: "Ranking de Moedas (do servidor)",
        description: arr.join(" ").toString(),
      },
    });
  }
}

module.exports = new Ranking();
