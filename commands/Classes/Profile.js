const { MessageEmbed, MessageAttachment } = require("discord.js");
const { doc, getDoc } = require("firebase/firestore");

class Profile {
  avatar(message) {
    function sendAvatar(userinfo) {
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setImage(`https://cdn.discordapp.com/avatars/${userinfo.id}/${userinfo.avatar}.png?size=1024`)
            .setFooter({ "text": `Solicitado por ${message.author.username}#${message.author.discriminator}` })
        ],
      });
    }

    let user = message.mentions.users.first();

    if (user == undefined) {
      sendAvatar(message.author);
    } else {
      sendAvatar(user);
    }
  }

  async #getUser(database, message) {
    const guild = doc(database, "Usuarios", message.guild.id);
    const member = doc(guild, "Usuarios", message.author.id);
    const member_doc = await getDoc(member);
    return member_doc.data();
  }

  async profile(database, message, args) {
    function embedProfile(userinfo, profile) {
      if (profile == undefined || profile == undefined) {
        return message.reply(
          "ô poxa, você ou esse outro usuário ainda não está registrado no Banco de Dados (do bot) desse servidor =/"
        );
      }

      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(userinfo.username + "#" + userinfo.discriminator)
            .addFields(
              { name: "Level", value: String(profile.level), inline: true },
              { name: "Xp", value: String(`${profile.xp}/${(profile.level + 1) * 100}`), inline: true },
              { name: "Saldo", value: String(profile.money) + " moedas" }
            )
            .setThumbnail(`https://cdn.discordapp.com/avatars/${userinfo.id}/${userinfo.avatar}.png?size=1024`
            )
        ]
      });
    }

    const profile = await this.#getUser(database, message);
    if (args[0] == null || args[0] == "") {
      embedProfile(message.author, profile);
    } else {
      let user = message.mentions.users.first();
      if (user == undefined) {
        embedProfile(message.author, profile);
      } else {
        embedProfile(user, profile);
      }
    }
  }

  async profilecard(database, message) {
    const canvacord = require("canvacord");

    let data = await this.#getUser(database, message);
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
      .setRequiredXP((level + 1) * 100)
      .setLevel(level)
      .setRank(money, "SALDO (Moedas)", true)
      .setProgressBar("#fff", "COLOR")
      .setUsername(message.author.username)
      .setDiscriminator(message.author.discriminator);

    rankCard.build().then((data) => {
      const attachment = new MessageAttachment(data, "rank.png");
      message.channel.send({ files: [attachment] });
    });
  }
}

module.exports = new Profile();
