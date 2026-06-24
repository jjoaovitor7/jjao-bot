import {
  AttachmentBuilder, EmbedBuilder, Message, Client,
} from "discord.js";
import {
  doc,
  updateDoc,
  getDoc,
  Firestore,
} from "firebase/firestore";
import Font from "ascii-art-font";
import discord_blackjack from "discord-blackjack";
import { prefix } from "../../config";
import { db } from "../../infra/db/firebase";
import SnakeGame from "snakecord";
import J from "discord-jokenpo";
import { Track, ProgramChangeEvent, NoteEvent, Writer } from "midi-writer-js";
import { CanvasImage, createCanvasImage } from "canvacord";

const snakeGame = new (SnakeGame as any)({
  title: "Snake",
  color: "GREEN",
  timestamp: true,
  gameOverTitle: "Game Over",
});

class Fun {
  async avatar2pixel(message: Message<true>) {
    const user = message.mentions.users.first() ?? message.author;
    const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;

    const img = new CanvasImage(url, 512, 512);
    img.steps.push(async (ctx: any) => {
      const native = await createCanvasImage(url);
      const grid = Math.round(native.width / 8);

      ctx.drawImage(native, 0, 0, grid, grid);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(ctx.canvas, 0, 0, grid, grid, 0, 0, ctx.canvas.width, ctx.canvas.height);
    });

    const buffer = await img.encode();
    message.channel.send({ files: [new AttachmentBuilder(buffer, { name: "pixel.png" })] });
  }

  async blackjack(message: Message<true>) {
    const game = await discord_blackjack(message, { resultEmbed: false });

    switch (game.result) {
      case "WIN":
        message.channel.send("Você ganhou.");
        break;
      case "LOSE":
        message.channel.send("Você perdeu.");
        break;
    }
  }

  cookie(message: Message<true>) {
    fetch("https://helloacm.com/api/fortune/")
      .then((response) => response.text())
      .then((data) => {
        message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setDescription(`:fortune_cookie: Biscoito da Sorte (em inglês)\n ${data}`)
              .setFooter({ text: "https://helloacm.com/api/fortune/" }),
          ],
        });
      })
      .catch(console.log);
  }

  jokenpo(client: Client, message: Message<true>, args: string[]) {
    const messages = {
      fail: `Tente ${prefix} jokenpo \`[pedra|papel|tesoura]\`.\nex.: \`${prefix} jokenpo pedra\``,
      gameStatus: {
        inProgress: "Partida iniciada ou há uma partida em andamento.",
        cancel: "Partida cancelada.",
      },
      messageTo: {
        user: "Aqui você digita a opção `[pedra | papel | tesoura]`.",
        opponent: `O usuário ${message.author.username}#${message.author.discriminator} te desafiou para uma partida de jokenpo!\nPara aceitar é necessário apenas digitar a opção \`[pedra | papel | tesoura]\``,
        timeout: "O tempo limite é de 60s.",
      },
    };

    const Jokenpo = new J(message);
    Jokenpo.setConfig(messages, "pt-br");

    Jokenpo.play(args[0])
      .then(async () => {
        if (message.guild !== null) {
          const r = Jokenpo.result();
          const choices = Jokenpo.getChoices();
          const text_bot = `\`1:\` ${choices.pone}\n\`2:\` ${choices.bot}`;
          const text = `\`1:\` ${choices.pone}\n\`2:\` ${choices.ptwo}`;

          if ("bot" in r) {
            if (r.player === false && r.bot === false) {
              message.channel.send(`${text_bot}\nEmpate!`);
              return;
            }

            const guild = doc(db as Firestore, "Guilds", message.guild!.id);
            const user = doc(guild, "Members", message.author.id);
            const user_doc = await getDoc(user);
            const user_data = user_doc.data() ?? { money: 0 };

            if (r.bot === true) {
              const random = Math.floor(Math.random() * 6 + 1);
              message.channel.send(`${text_bot}\n<@${client.user!.id}> ganhou.\nVocê perdeu \`${random} coins\`!`);
              updateDoc(user, { money: user_data.money - random });
            } else if (r.player === true) {
              const random = Math.floor(Math.random() * 11 + 1);
              message.channel.send(`${text_bot}\n<@${message.author.id}> ganhou.\nVocê ganhou \`${random} coins\`!`);
              updateDoc(user, { money: user_data.money + random });
            }
          } else {
            if (r.player1 === false && r.player2 === false) {
              message.channel.send(`${text}\nEmpate!`);
            } else if (r.player2 === true) {
              message.channel.send(`${text}\n${message.mentions.users.first()} ganhou.`);
            } else if (r.player1 === true) {
              message.channel.send(`${text}\n<@${message.author.id}> ganhou.`);
            }
          }
        }
      })
      .catch(console.log);
  }

  async snake(message: Message<true>) {
    await snakeGame.newGame(message as any);
  }

  rndnote(message: Message<true>) {
    const track = new Track();
    track.addEvent(new ProgramChangeEvent({ instrument: 1 }));

    const notes = [
      "A3", "A4", "Ab4", "A5",
      "Bb2", "Bb3", "B4", "Bb4",
      "C4", "C5", "C#5", "C6",
      "D5", "D#5", "E4", "E5",
      "F3", "F#3", "F5", "F#5",
      "G3", "G#3", "G4", "Gb4", "G5", "Gb5",
    ];

    track.addEvent(
      new NoteEvent({
        pitch: [notes[Math.floor(Math.random() * (notes.length - 1))]],
        duration: "8",
      })
    );

    const writer = new Writer(track);
    message.channel.send({
      files: [new AttachmentBuilder(Buffer.from(writer.buildFile()), { name: "note.mid" })],
    });
  }

  word2ascii(message: Message<true>, args: string[]) {
    if (args[0]?.trim()) {
      Font.create(args[0], "Doom", (_err: Error | null, rendered: string) => {
        message.channel.send(`\`\`\`${rendered}\`\`\``);
      });
    }
  }
}

export default new Fun();
