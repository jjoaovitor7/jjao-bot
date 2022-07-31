const { MessageAttachment, MessageEmbed } = require("discord.js");
const { doc, updateDoc, getDoc } = require("firebase/firestore");

class Fun {
  async avatar2braille(message) {
    const { braillefy } = require("img2braille");

    const options = {
      dither: false,
      invert: false,
    };

    let user = message.mentions.users.first();

    const imgbraille = await braillefy(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`
      , 20, // width
      options
    );

    message.channel.send(imgbraille);
  }

  avatar2pixel(message) {
    let user = message.mentions.users.first();
    if (user != undefined) {
      const canvacord = require("canvacord");

      canvacord.Canvas.pixelate(
        `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`,
        5
      ).then(function (img) {
        const attachment = new MessageAttachment(img, "pixel.png");
        message.channel.send({files: [attachment]});
      });
    } else {
      const canvacord = require("canvacord");


      canvacord.Canvas.pixelate(
        `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=1024`,
        5
      ).then(function (img) {
        const attachment = new MessageAttachment(img, "pixel.png");
        message.channel.send({files: [attachment]});
      });
    }
  }

  // avatar2circle(message) {
  //   let user = message.mentions.users.first();

  //   if (user != undefined) {
  //     const canvacord = require("canvacord");

  //     canvacord.Canvas.circle(
  //       `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`,
  //       5
  //     ).then(function (img) {
  //       const attachment = new MessageAttachment(img, "circle.png");
  //       message.channel.send({ files: [attachment] });
  //     });
  //   } else {
  //     const canvacord = require("canvacord");

  //     canvacord.Canvas.circle(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=1024`,
  //       5
  //     ).then(function (img) {
  //       const attachment = new MessageAttachment(img, "circle.png");
  //       message.channel.send({ files: [attachment] });
  //     });
  //   }
  // }

  clap(message) {
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setImage("https://cdn.pixabay.com/photo/2019/07/17/02/59/applause-4342965_960_720.jpg")
          .setFooter({ "text": "https://pixabay.com/pt/illustrations/aplausos-mãos-bater-palmas-black-4342965/" })
      ]
    });
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
    const _Jokenpo = require("discord-jokenpo");

    const messages = {
      fail: "Tente jj jokenpo `[pedra|papel|tesoura]`.\nex.: `jj jokenpo pedra`",
      gameResults: {
        draw: "Empate!",
        botWinner: `<@${client.user.id}> ganhou.`,
        opponentWinner: `${message.mentions.users.first()} ganhou.`,
        userWinner: `<@${message.author.id}> ganhou.`,
      },
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

    const Jokenpo = new _Jokenpo(message, args[0]);
    Jokenpo.setMessages(messages);
    Jokenpo.setLang("pt-br");

    try {
      Jokenpo.play().then(async () => {
        Jokenpo.send();

        if (Jokenpo.getPlayersCount() === 1 && message.guild !== null) {
          const result = Jokenpo.result();
          if (result.player === false && result.opponent === false) {
          } else if (result.opponent === true) {
            let random = Math.floor(Math.random() * 6 + 1);
            message.channel.send(`Você perdeu \`${random} coins\`!`);

            const guild = doc(database, "Usuarios", message.guild.id);
            const user = doc(guild, "Usuarios", message.author.id);
            const user_doc = await getDoc(user);

            updateDoc(user, {
              money: user_doc.data().money - random
            });
          } else if (result.player === true) {
            let random = Math.floor(Math.random() * 11 + 1);
            message.channel.send(`Você ganhou \`${random} coins\`!`);

            const guild = doc(database, "Usuarios", message.guild.id);
            const user = doc(guild, "Usuarios", message.author.id);
            const user_doc = await getDoc(user);

            updateDoc(user, {
              money: user_doc.data().money + random
            });
          }
        }
      });
    } catch (TypeError) { }
  }

  risitas(message) {
    message.channel.send("https://www.youtube.com/watch?v=QT13kk8HDDo");
  }

  sadcat(message) {
    message.channel.send("https://tenor.com/view/austin-sad-cat-gif-18483293");
  }

  rndnote(message) {
    let MidiWriter = require("midi-writer-js");

    let track = new MidiWriter.Track();
    track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));

    let notes = [
      "A3",
      "A4",
      "Ab4",
      "A5",
      "Bb2",
      "Bb3",
      "B4",
      "Bb4",
      "C4",
      "C5",
      "C#5",
      "C6",
      "D5",
      "D#5",
      "E4",
      "E5",
      "F3",
      "F#3",
      "F5",
      "F#5",
      "G3",
      "G#3",
      "G4",
      "Gb4",
      "G5",
      "Gb5",
    ];
    let notes_arr = [];

    notes_arr.push(notes[Math.floor(Math.random() * (notes.length - 1))]);
    track.addEvent(
      new MidiWriter.NoteEvent({ pitch: notes_arr, duration: "8" })
    );

    let writer = new MidiWriter.Writer(track);
    writer.saveMIDI("note");
    message.channel.send({
      files: ["note.mid"],
    });
  }

  // word2ascii(message, args) {
  //   if (args != null && args != "" && args != " ") {
  //     const axios = require("axios");

  //     axios
  //       .get(`https://artii.herokuapp.com/make?text=${args[0]}`)
  //       .then(function (response) {
  //         message.channel.send(`\`\`\`${response.data}\`\`\``);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       })
  //       .then(function () { });
  //   }
  // }
}

module.exports = new Fun();
