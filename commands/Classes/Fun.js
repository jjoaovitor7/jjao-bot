const { MessageAttachment, MessageEmbed } = require("discord.js");
const { doc, updateDoc, getDoc } = require("firebase/firestore");
const Font = require("ascii-art-font");
const discord_blackjack = require("discord-blackjack");
const { prefix } = require("../../config");
const SnakeGame = require("snakecord");
const snakeGame = new SnakeGame({
  title: "Snake",
  color: "GREEN",
  timestamp: true,
  gameOverTitle: "Game Over"
});

class Fun {
  avatar2pixel(message) {
    let user = message.mentions.users.first();
    if (user != undefined) {
      const canvacord = require("canvacord");

      canvacord.Canvas.pixelate(
        `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`,
        5
      ).then(function (img) {
        const attachment = new MessageAttachment(img, "pixel.png");
        message.channel.send({ files: [attachment] });
      });
    } else {
      const canvacord = require("canvacord");


      canvacord.Canvas.pixelate(
        `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=1024`,
        5
      ).then(function (img) {
        const attachment = new MessageAttachment(img, "pixel.png");
        message.channel.send({ files: [attachment] });
      });
    }
  }

  async blackjack(message) {
    let game = await discord_blackjack(message, { resultEmbed: false });

    switch (game.result) {
      case "WIN":
        message.channel.send("Você ganhou.");
        break;
      case "LOSE":
        message.channel.send("Você perdeu.");
        break;
    }
  }

  cookie(message) {
    const axios = require("axios");

    axios
      .get("https://helloacm.com/api/fortune/")
      .then(function (response) {
        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setDescription(`:fortune_cookie: Biscoito da Sorte (em inglês)\n ${response.data}`)
              .setFooter({ "text": "https://helloacm.com/api/fortune/" })
          ]
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  jokenpo(database, client, message, args) {
    const J = require("discord-jokenpo");

    const messages = {
      fail: `Tente ${prefix} jokenpo \`[pedra|papel|tesoura]\`.\nex.: \`${prefix} jokenpo pedra\``,
      gameStatus: {
        inProgress: "Partida iniciada ou há uma partida em andamento.",
        cancel: "Partida cancelada.",
      },
      messageTo: {
        user: "Aqui você digita a opção `[pedra | papel | tesoura]`.",
        opponent: `O usuário ${message.author.username}#${message.author.discriminator} te desafiou para uma partida de jokenpo!
Para aceitar é necessário apenas digitar a opção \`[pedra | papel | tesoura]\``,
        timeout: "O tempo limite é de 60s.",
      },
    };

    const Jokenpo = new J(message);
    Jokenpo.setConfig(messages, "pt-br");

    Jokenpo.play(args[0]).then(async () => {
      if (message.guild !== null) {
        const r = Jokenpo.result();
        const choices = Jokenpo.getChoices();

        const text_bot = `\`1:\` ${choices.pone}\n\`2:\` ${choices.bot}`;
        const text = `\`1:\` ${choices.pone}\n\`2:\` ${choices.ptwo}`;

        if ("bot" in r) {
          if (r.player === false && r.bot === false) {
            message.channel.send(`${text_bot}\nEmpate!`);
          } else if (r.bot === true) {
            let random = Math.floor(Math.random() * 6 + 1);
            message.channel.send(`${text_bot}\n<@${client.user.id}> ganhou.
Você perdeu \`${random} coins\`!`);

            const guild = doc(database, "Guilds", message.guild.id);
            const user = doc(guild, "Members", message.author.id);
            const user_doc = await getDoc(user);

            updateDoc(user, {
              money: user_doc.data().money - random
            });
          } else if (r.player === true) {
            let random = Math.floor(Math.random() * 11 + 1);
            message.channel.send(`${text_bot}\n<@${message.author.id}> ganhou.
Você ganhou \`${random} coins\`!`);

            const guild = doc(database, "Guilds", message.guild.id);
            const user = doc(guild, "Members", message.author.id);
            const user_doc = await getDoc(user);

            updateDoc(user, {
              money: user_doc.data().money + random
            });
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
    }).catch(console.error);
  }

  async snake(message) {
    await snakeGame.newGame(message);
  }

  rndnote(message) {
    const MidiWriter = require("midi-writer-js");
    let track = new MidiWriter.Track();
    track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));

    const notes = [
      "A3", "A4", "Ab4", "A5",
      "Bb2", "Bb3", "B4", "Bb4",
      "C4", "C5", "C#5", "C6",
      "D5", "D#5", "E4", "E5",
      "F3", "F#3", "F5", "F#5",
      "G3", "G#3", "G4", "Gb4", "G5", "Gb5"];

    track.addEvent(
      new MidiWriter.NoteEvent({ pitch: [notes[Math.floor(Math.random() * (notes.length - 1))]], duration: "8" })
    );

    let writer = new MidiWriter.Writer(track);
    let buffer = Buffer.from(writer.buildFile());
    message.channel.send({
      files: [new MessageAttachment(buffer, "note.mid")],
    });
  }

  word2ascii(message, args) {
    if (args != null && args[0].trim() != "") {
      Font.create(args[0], "Doom", function (err, rendered) {
        message.channel.send(`\`\`\`${rendered}\`\`\``);
      })
    }
  }
}

module.exports = new Fun();
