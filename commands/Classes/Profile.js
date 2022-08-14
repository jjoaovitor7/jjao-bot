const { MessageEmbed, MessageAttachment } = require("discord.js");
const { doc, getDoc } = require("firebase/firestore");
const moment = require("moment");
require("moment-duration-format");

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

  async #getUser(database, guild_id, user_id) {
    const guild = doc(database, "Guilds", guild_id);
    const member = doc(guild, "Members", user_id);
    const member_doc = await getDoc(member);
    return member_doc.data();
  }

  async profile(database, message, args) {
    function embedProfile(userinfo, profile) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(userinfo.username + "#" + userinfo.discriminator)
            .addFields(
              { name: "Level", value: String(profile.level), inline: true },
              { name: "Xp", value: String(`${profile.xp}/${(profile.level + 1) * 100}`), inline: true },
              { name: "Saldo", value: String(profile.money) + " moedas" },
              // { name: "Criado em", value: moment.utc(message.author.createdAt).format("LL"), inline: true }
            )
            .setThumbnail(`https://cdn.discordapp.com/avatars/${userinfo.id}/${userinfo.avatar}.png?size=1024`
            )
            .setFooter({ "text": `ID: ${userinfo.id}` })
        ]
      });
    }

    if (args[0] === undefined || args[0] === null || args[0].trim() == "") {
      const data = await this.#getUser(database, message.guild.id, message.author.id);
      embedProfile(message.author, data);
    } else {
      const user = message.mentions.users.first();
      const data = await this.#getUser(database, message.guild.id, user.id);
      embedProfile(user, data);
    }
  }

  async profilecard(database, message) {
    const canvacord = require("canvacord");

    const data = await this.#getUser(database, message.guild.id, message.author.id);
    const xp = data.xp;
    const level = data.level;
    const coins = data.money;

    const rankCard = new canvacord.Rank()
      .setAvatar(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=1024`)
      .setCurrentXP(xp)
      .setRequiredXP((level + 1) * 100)
      .setLevel(level)
      .setRank(coins, "SALDO (Moedas)", true)
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
