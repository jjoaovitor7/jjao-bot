import { Font, RankCardBuilder } from "canvacord";
import { EmbedBuilder, AttachmentBuilder, Message } from "discord.js";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../infra/db/firebase";

class Profile {
  private sendAvatar(message: Message<true>, userinfo: any) {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setImage(
            `https://cdn.discordapp.com/avatars/${userinfo.id}/${userinfo.avatar}.png?size=1024`
          )
          .setFooter({
            text: `Solicitado por ${message.author.username}#${message.author.discriminator}`,
          }),
      ],
    });
  }

  avatar(message: Message<true>) {
    const user = message.mentions.users.first() ?? message.author;
    this.sendAvatar(message, user);
  }

  private async getUser(guild_id: string, user_id: string) {
    const guild = doc(db, "Guilds", guild_id);
    const member = doc(guild, "Members", user_id);
    const member_doc = await getDoc(member);
    return member_doc.data() ?? {
      level: 0,
      xp: 0,
      money: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
    };
  }

  private embedProfile(message: Message<true>, userinfo: any, profile: any) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle(userinfo.username + "#" + userinfo.discriminator)
          .addFields(
            { name: "Level", value: String(profile.level), inline: true },
            { name: "Xp", value: `${profile.xp}/${(profile.level + 1) * 100}`, inline: true },
            { name: "Saldo", value: String(profile.money) + " moedas" },
          )
          .setThumbnail(
            `https://cdn.discordapp.com/avatars/${userinfo.id}/${userinfo.avatar}.png?size=1024`
          )
          .setFooter({ text: `ID: ${userinfo.id}` }),
      ],
    });
  }

  async profile(message: Message<true>, args: string[]) {
    if (!args[0]?.trim()) {
      return this.embedProfile(message, message.author, await this.getUser(message.guild!.id, message.author.id));
    }

    const user = message.mentions.users.first()!;
    return this.embedProfile(message, user, await this.getUser(message.guild!.id, user.id));
  }

  async profilecard(message: Message<true>) {
    const data = await this.getUser(message.guild!.id, message.author.id);

    Font.loadDefault();

    const rankCard = new RankCardBuilder()
      .setDisplayName(message.author.username)
      .setAvatar(
        `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=1024`
      )
      .setCurrentXP(data.xp)
      .setRequiredXP((data.level + 1) * 100)
      .setLevel(data.level)
      .setBackground("#23272A")
      .setOverlay(50)
      .setTextStyles({ level: "Level", xp: "XP" })
      .setStyles({
        progressbar: { thumb: { style: { backgroundColor: "#fff" as any } } },
      } as any);

    if (data.money > 0) {
      rankCard.setUsername(`Saldo: ${data.money}`);
    }

    message.channel.send({
      files: [new AttachmentBuilder(await rankCard.build({ format: "png" }), { name: "rank.png" })],
    });
  }
}

export default new Profile();
