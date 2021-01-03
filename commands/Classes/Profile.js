const Discord = require("discord.js");

class Profile {
  avatar(message) {
    function sendAvatar(userinfo) {
      message.channel.send({
        embed: {
          image: {
            url:
              "https://cdn.discordapp.com/avatars/" +
              userinfo.id +
              "/" +
              userinfo.avatar +
              ".png?size=1024",
          },
          footer: {
            text:
              "Solicitado por " +
              message.author.username +
              "#" +
              message.author.discriminator,
          },
        },
      });
    }

    let user = message.mentions.users.first();

    if (user == undefined) {
      sendAvatar(message.author);
    } else {
      sendAvatar(user);
    }
  }

  async profile(database, message, args) {
    function embedProfile(userinfo, profile) {
      if (profile == undefined || profile == undefined) {
        return message.reply(
          "ô poxa, você ou esse outro usuário ainda não está registrado no Banco de Dados (do bot) desse servidor =/"
        );
      }

      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle(userinfo.username + "#" + userinfo.discriminator)
          .addFields(
            { name: "Level", value: profile.level, inline: true },
            { name: "Xp", value: profile.xp + "/100", inline: true },
            { name: "Saldo", value: profile.money + " moedas" }
          )
          .setThumbnail(
            "https://cdn.discordapp.com/avatars/" +
              userinfo.id +
              "/" +
              userinfo.avatar +
              ".png?size=1024"
          )
      );
    }

    function getDocUser(userinfo) {
      return database
        .collection("Usuarios")
        .doc(message.guild.id)
        .collection("Usuarios")
        .where("id", "==", userinfo.id)
        .get();
    }

    if (args[0] == null || args[0] == "") {
      function getData() {
        return getDocUser(message.author).then(function (querySnapshot) {
          let profile;
          querySnapshot.forEach(function (documentSnapshot) {
            profile = documentSnapshot.data();
          });
          return profile;
        });
      }

      let profile = await getData();

      embedProfile(message.author, profile);
    } else {
      let user = message.mentions.users.first();

      if (user == undefined) {
        function getData() {
          return getDocUser(message.author).then(function (querySnapshot) {
            let profile;
            querySnapshot.forEach(function (documentSnapshot) {
              profile = documentSnapshot.data();
            });
            return profile;
          });
        }

        let profile = await getData();

        embedProfile(message.author, profile);
      } else {
        function getData() {
          return getDocUser(user).then(function (querySnapshot) {
            let profile;
            querySnapshot.forEach(function (documentSnapshot) {
              profile = documentSnapshot.data();
            });
            return profile;
          });
        }

        let profile = await getData();

        embedProfile(user, profile);
      }
    }
  }

  async profilecard(database, message) {
    const canvacord = require("canvacord");

    function getDocUser(userinfo) {
      return database
        .collection("Usuarios")
        .doc(message.guild.id)
        .collection("Usuarios")
        .where("id", "==", userinfo.id)
        .get();
    }

    function getData() {
      return getDocUser(message.author).then(function (querySnapshot) {
        let profile;
        querySnapshot.forEach(function (documentSnapshot) {
          profile = documentSnapshot.data();
        });
        return profile;
      });
    }

    let data = await getData();
    let xp = data.xp;
    let level = data.level;
    let money = data.money;

    const rankCard = new canvacord.Rank()
      .setAvatar(
        "https://cdn.discordapp.com/avatars/" +
          message.author.id +
          "/" +
          message.author.avatar +
          ".png?size=1024"
      )
      .setCurrentXP(xp)
      .setRequiredXP(100)
      .setLevel(level)
      .setRank(money, "SALDO (Moedas)", true)
      .setProgressBar("#fff", "COLOR")
      .setUsername(message.author.username)
      .setDiscriminator(message.author.discriminator);

    rankCard.build().then((data) => {
      const attachment = new Discord.MessageAttachment(data, "rank.png");
      message.channel.send(attachment);
    });
  }
}

module.exports = Profile;
