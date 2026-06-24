import { EmbedBuilder, Message } from "discord.js";
import moment from "moment";
import { prefix } from "../../config";
import {
  collection,
  doc,
  limit,
  orderBy,
  query,
  getDoc,
  getDocs,
  updateDoc,
  Firestore,
} from "firebase/firestore";
import { db } from "../../infra/db/firebase";

class Balance {
  async checkToAdd(message: Message<true>, type: string, text: string) {
    const guild = doc(db as Firestore, "Guilds", message.guild!.id);
    const member = doc(guild, "Members", message.author.id);
    const member_doc = await getDoc(member);
    const user_data = member_doc.data() ?? {
      money: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
    };

    const time = user_data[type];
    if (Date.now() < time) {
      moment.locale("pt-br");
      message.reply(`Poderá pegar novamente em ${moment(time).format("lll")}.`);
      return;
    }

    const amount = Math.floor(Math.random() * 55) + 1;
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#0099ff")
          .addFields({ name: `Moedas (${text})`, value: `${amount} moedas.` }),
      ],
    });

    const update: Record<string, number> = {
      money: user_data.money + amount,
      [type]: Date.now() + (
        type === "daily" ? 86400000 :
        type === "weekly" ? 604800000 :
        2592000000
      ),
    };
    updateDoc(member, update);
  }

  async moneyranking(message: Message<true>) {
    const guild = collection(db as Firestore, "Guilds", message.guild!.id, "Members");
    const docs_filter = query(guild, limit(5), orderBy("money", "desc"));
    const docs = await getDocs(docs_filter);
    const lines = docs.docs.map((d, i) =>
      `${i + 1}: ${d.data().name} (moedas: ${d.data().money})\n`
    );

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#ffd700")
          .setTitle("Ranking de Moedas (do servidor)")
          .setDescription(lines.join(" ")),
      ],
    });
  }

  async transfer(message: Message<true>, args: string[]) {
    const toTransfer = message.mentions.users.first();
    const amount = parseInt(args[0]);

    if (
      !isNaN(amount) && amount > 0 &&
      toTransfer && toTransfer.id !== message.author.id && !toTransfer.bot
    ) {
      const guild = doc(db as Firestore, "Guilds", message.guild!.id);
      const member = doc(guild, "Members", message.author.id);
      const member_doc = await getDoc(member);
      const othermember = doc(guild, "Members", toTransfer.id);
      const othermember_doc = await getDoc(othermember);
      const sender_data = member_doc.data() ?? { money: 0 };
      const receiver_data = othermember_doc.data() ?? { money: 0 };

      if (amount <= sender_data.money) {
        await updateDoc(member, { money: sender_data.money - amount });
        await updateDoc(othermember, { money: receiver_data.money + amount });
        message.channel.send(`Transferência de \`${amount} moeda(s)\` concluída.`);
      } else {
        message.reply("você não possui essa quantia de moedas.");
      }
    } else {
      message.channel.send("Tente \`jj transfer [quantia] [usuario]\`.");
    }
  }
}

export default new Balance();
