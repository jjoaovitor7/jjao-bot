import { Client, Message, PermissionFlagsBits } from "discord.js";
import {
  collection,
  doc,
  deleteField,
  query,
  limit,
  orderBy,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  DocumentReference,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../infra/db/firebase";

class Leveling {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  private async registerUser(guild: DocumentReference, member: DocumentReference, message: Message<true>) {
    await setDoc(guild, { name: message.guild!.name });
    await setDoc(member, {
      id: message.author.id,
      name: message.author.username + "#" + message.author.discriminator,
      xp: 0,
      level: 0,
      money: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
    });
  }

  private async updateLevel(guild_doc: DocumentSnapshot, member: DocumentReference, member_doc: DocumentSnapshot, message: Message<true>) {
    const member_data = member_doc.data();
    const calc = (member_data.level + 1) * 100;

    if (member_data.xp >= calc) {
      await updateDoc(member, { xp: 0, level: member_data.level + 1 });

      if (guild_doc.exists && "channel_levelup" in guild_doc.data()) {
        const channel_id = guild_doc.data().channel_levelup;
        const channel = this.client.channels.cache.find((c: any) => c.id === channel_id);
        (channel as any)?.send(
          `<@${message.author.id}>, passou de nível! Agora ele é level ${member_data.level + 1}!`
        );
      } else if (guild_doc.exists) {
        message.reply(`você subiu de nível! Agora você é level ${member_data.level + 1}.`);
      }
    } else {
      await updateDoc(member, { xp: member_data.xp + 5 });
    }
  }

  async leveling(message: Message<true>) {
    const guild = doc(db, "Guilds", message.guild!.id);
    const guild_doc = await getDoc(guild);
    const member = doc(guild, "Members", message.author.id);
    const member_doc = await getDoc(member);
    const member_data = member_doc.data();

    if (member_doc.exists() && member_data != null) {
      await this.updateLevel(guild_doc, member, member_doc, message);
    } else {
      await this.registerUser(guild, member, message);
    }
  }

  setlevelingchannel(message: Message<true>) {
    if (!message.member?.permissions.has(PermissionFlagsBits.Administrator)) {
      message.channel.send("Somente administradores podem usar esse comando.");
      return;
    }

    const channel = message.mentions.channels.first();
    if (!channel) {
      message.channel.send("Você precisa marcar o canal.");
      return;
    }

    const guild = doc(db, "Guilds", message.guild!.id);
    updateDoc(guild, { channel_levelup: channel.id }).then(() => {
      message.channel.send(`Canal <#${channel.id}> setado como canal de level-up!`);
    });
  }

  async disablelevelingchannel(message: Message<true>) {
    if (!message.member?.permissions.has(PermissionFlagsBits.Administrator)) {
      message.channel.send("Somente administradores podem usar esse comando.");
      return;
    }

    const guild = doc(db, "Guilds", message.guild!.id);
    const guild_doc = await getDoc(guild);

    if ("channel_levelup" in guild_doc.data()!) {
      await updateDoc(guild, { channel_levelup: deleteField() });
      message.channel.send("Canal de level-up deletado do sistema.");
    } else {
      message.channel.send("Tem certeza que existe canal de level-up setado nesse servidor?");
    }
  }

  async ranking(message: Message<true>, length: number) {
    const guild = collection(db, "Guilds", message.guild!.id, "Members");
    const docs_filter = query(guild, limit(length), orderBy("level", "desc"), orderBy("xp", "desc"));
    const docs = await getDocs(docs_filter);

    return docs.docs.map((d, i) =>
      `${i + 1}: ${d.data().name} (level: ${d.data().level + 1}, xp: ${d.data().xp})\n`
    );
  }
}

export default Leveling;
