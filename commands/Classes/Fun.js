const Discord = require("discord.js");
const blackjack = require("discord-blackjack");
class Fun {
  async avatar2braille(message) {
    const { braillefy } = require("img2braille");

    const options = {
      dither: false,
      invert: false,
    };

    let user = message.mentions.users.first();

    const imgbraille = await braillefy(
      "https://cdn.discordapp.com/avatars/" +
        user.id +
        "/" +
        user.avatar +
        ".png?size=1024",
      20, // width
      options
    );

    message.channel.send(imgbraille);
  }

  avatar2pixel(message) {
    let user = message.mentions.users.first();
    if (user != undefined) {
      const canvacord = require("canvacord");

      canvacord.Canvas.pixelate(
        "https://cdn.discordapp.com/avatars/" +
          user.id +
          "/" +
          user.avatar +
          ".png?size=1024",
        5
      ).then(function (img) {
        const attachment = new Discord.MessageAttachment(img, "pixel.png");
        message.channel.send(attachment);
      });
    } else {
      const canvacord = require("canvacord");

      canvacord.Canvas.pixelate(
        "https://cdn.discordapp.com/avatars/" +
          message.author.id +
          "/" +
          message.author.avatar +
          ".png?size=1024",
        5
      ).then(function (img) {
        const attachment = new Discord.MessageAttachment(img, "pixel.png");
        message.channel.send(attachment);
      });
    }
  }

  avatar2circle(message) {
    let user = message.mentions.users.first();

    if (user != undefined) {
      const canvacord = require("canvacord");

      canvacord.Canvas.circle(
        "https://cdn.discordapp.com/avatars/" +
          user.id +
          "/" +
          user.avatar +
          ".png?size=1024",
        5
      ).then(function (img) {
        const attachment = new Discord.MessageAttachment(img, "circle.png");
        message.channel.send(attachment);
      });
    } else {
      const canvacord = require("canvacord");

      canvacord.Canvas.circle(
        "https://cdn.discordapp.com/avatars/" +
          message.author.id +
          "/" +
          message.author.avatar +
          ".png?size=1024",
        5
      ).then(function (img) {
        const attachment = new Discord.MessageAttachment(img, "circle.png");
        message.channel.send(attachment);
      });
    }
  }

  clap(message) {
    message.channel.send({
      embed: {
        image: {
          url: "https://cdn.pixabay.com/photo/2019/07/17/02/59/applause-4342965_960_720.jpg",
        },
        footer: {
          text: "https://pixabay.com/pt/illustrations/aplausos-mãos-bater-palmas-black-4342965/",
        },
      },
    });
  }

  cookie(message) {
    const axios = require("axios");

    axios
      .get("https://helloacm.com/api/fortune/")
      .then(function (response) {
        message.channel.send({
          embed: {
            description:
              ":fortune_cookie: Biscoito da Sorte (em inglês)\n" +
              response.data,
            footer: {
              text: "https://helloacm.com/api/fortune/",
            },
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  jokenpo(database, client, message, args) {
    const _Jokenpo = require("discord-jokenpo");
    const Jokenpo = new _Jokenpo(
      "Tente jj jokenpo `[pedra|papel|tesoura]`.\nex.: `jj jokenpo pedra`",
      "pt-br",
      "Empate!",
      `<@${client.user.id}> ganhou.`,
      `${message.mentions.users.first()} ganhou.`,
      `<@${message.author.id}> ganhou.`,
      "Partida iniciada ou há uma partida em andamento.",
      message,
      args[0]
    );

    try {
      Jokenpo.play().then(() => {
        Jokenpo.send();

        if (Jokenpo.getPlayersCount() === 1) {
          const result = Jokenpo.result();
          if (result.player == false && result.opponent == false) {
          } else if (result.opponent == true) {
            let random = Math.floor(Math.random() * 6 + 1);
            message.channel.send(`Você perdeu \`${random} coins\`!`);
            database
              .collection("Usuarios")
              .doc(message.guild.id)
              .collection("Usuarios")
              .where("id", "==", message.author.id)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (documentSnapshot) {
                  database
                    .collection("Usuarios")
                    .doc(message.guild.id)
                    .collection("Usuarios")
                    .doc(documentSnapshot.id)
                    .update({ money: documentSnapshot.data().money - random });
                });
              });
          } else if (result.player == true) {
            let random = Math.floor(Math.random() * 11 + 1);
            message.channel.send(`Você ganhou \`${random} coins\`!`);
            database
              .collection("Usuarios")
              .doc(message.guild.id)
              .collection("Usuarios")
              .where("id", "==", message.author.id)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (documentSnapshot) {
                  database
                    .collection("Usuarios")
                    .doc(message.guild.id)
                    .collection("Usuarios")
                    .doc(documentSnapshot.id)
                    .update({ money: documentSnapshot.data().money + random });
                });
              });
          }
        }
      });
    } catch (TypeError) {}
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
    let notesAux = [];

    notesAux.push(notes[Math.floor(Math.random() * (notes.length - 1))]);
    track.addEvent(
      new MidiWriter.NoteEvent({ pitch: notesAux, duration: "8" })
    );

    let writer = new MidiWriter.Writer(track);
    writer.saveMIDI("note");
    message.channel.send(null, {
      files: ["note.mid"],
    });
  }

  word2ascii(message, args) {
    if (args != null && args != "" && args != " ") {
      const axios = require("axios");

      axios
        .get(`https://artii.herokuapp.com/make?text=${args[0]}`)
        .then(function (response) {
          message.channel.send(`\`\`\`${response.data}\`\`\``);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    }
  }
}

module.exports = new Fun();
