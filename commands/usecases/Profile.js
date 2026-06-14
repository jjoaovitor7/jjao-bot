const os = require("os");
const canvacord = require("canvacord");
const toAbbrev = require("canvacord/src/Util").toAbbrev;
const { createRequire } = require("module");

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
            .setFooter({
              "text": `Solicitado por ${message.author.username}#${message.author.discriminator}`
            })
        ],
      });
    }

    let user = message.mentions.users.first();
    if (user == undefined) {
      sendAvatar(message.author);
      return;
    }

    sendAvatar(user);
  }

  async #getUser(database, guild_id, user_id) {
    const guild = doc(database, "Guilds", guild_id);
    const member = doc(guild, "Members", user_id);
    const member_doc = await getDoc(member);
    return member_doc.data() ?? {
      level: 0,
      xp: 0,
      money: 0,
      daily: 0,
      weekly: 0,
      monthly: 0
    };
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
      return;
    }

    const user = message.mentions.users.first();
    const data = await this.#getUser(database, message.guild.id, user.id);
    embedProfile(user, data);
  }

  async profilecard(database, message) {
   process.env.CANVACORD_ASSETS = os.tmpdir();
   const Canvas = createRequire(require.resolve("canvacord"))("@napi-rs/canvas");

    const data = await this.#getUser(database, message.guild.id, message.author.id);
    const xp = data.xp;
    const level = data.level;
    const coins = data.money;

    const levelLabel = "Level";
    const currencyLabel = "Saldo";
    const levelVal = toAbbrev(level);
    const currencyVal = toAbbrev(coins);

    const rankCard = new canvacord.Rank()
      .setAvatar(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=1024`)
      .setCurrentXP(xp)
      .setRequiredXP((level + 1) * 100)
      .setLevel(level, levelLabel, false)
      .setRank(coins, currencyLabel, false)
      .setProgressBar("#fff", "COLOR")
      .setUsername(message.author.username);

    const card = await rankCard.build();

    const ow = rankCard.data.width, oh = rankCard.data.height;
    const src = await Canvas.loadImage(card);
    const full = Canvas.createCanvas(ow, oh);
    const fctx = full.getContext("2d");
    fctx.drawImage(src, 0, 0);

    fctx.font = `bold 28px`;
    const labelWidth = fctx.measureText(levelLabel).width;
    const valWidth = fctx.measureText(levelVal).width;
    const levelX = ow - ((labelWidth + valWidth) * 4.32);

    const rankX = levelX + labelWidth + valWidth + 42;

    fctx.textAlign = "start";
    fctx.fillStyle = rankCard.data.level.textColor;
    fctx.fillText(levelLabel, levelX, 82);
    fctx.fillText(levelVal, levelX, 128);

    fctx.font = `bold 28px`;
    fctx.fillStyle = rankCard.data.rank.color;
    fctx.fillText(currencyLabel, rankX, 82);
    fctx.fillText(currencyVal, rankX, 128);

    const final = await full.encode("png");
    const attachment = new MessageAttachment(final, "rank.png");
    message.channel.send({ files: [attachment] });
  }
}

module.exports = new Profile();
