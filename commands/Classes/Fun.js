const Discord = require("discord.js");

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
          url:
            "https://cdn.pixabay.com/photo/2019/07/17/02/59/applause-4342965_960_720.jpg",
        },
        footer: {
          text:
            "https://pixabay.com/pt/illustrations/aplausos-mãos-bater-palmas-black-4342965/",
        },
      },
    });
  }

  // connect4(message) {
  //   const GameCord = require("gamecord").djs;
  //   new GameCord.ConnectFour(message).setTitle("Connect4").run();
  // }

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

  risitas(message) {
    message.channel.send("https://www.youtube.com/watch?v=QT13kk8HDDo");
  }

  // gritar(message, talkedRecently) {
  //   if (talkedRecently.has(message.author.id)) {
  //     message.reply("agora você só pode usar esse comando daqui a 5 minutos.");
  //   } else {
  //     // message.channel.send("A".repeat(Math.floor(Math.random() * 2000)));
  //     message.channel.send("A".repeat(Math.floor(Math.random() * 100)));

  //     talkedRecently.add(message.author.id);
  //     setTimeout(() => {
  //       talkedRecently.delete(message.author.id);
  //     }, 300000);
  //   }
  // }

  // gritaum(message, talkedRecently) {
  //   if (talkedRecently.has(message.author.id)) {
  //     message.reply("agora você só pode usar esse comando daqui a 5 minutos.");
  //   } else {
  //     let screamURLs = [
  //       "https://www.youtube.com/watch?v=cWBPjTQvNY8", // MARIO SCREAMING 2
  //       "https://www.youtube.com/watch?v=32Hp1LW08Yc", // MARIO SCREAMING
  //       "https://www.youtube.com/watch?v=FIZ7iBHZglA", // MARIO SCREAMING 3
  //       "https://www.youtube.com/watch?v=CMzETi5kGJ4", // LUIGI SCREAMING
  //       "https://www.youtube.com/watch?v=5VuQxoNrwhw", // KIRBY'S SCREAMING ADVENTURE
  //       "https://www.youtube.com/watch?v=BTs5FS66IUI", // Baby Shark But Im Screaming The Lyrics
  //       "https://www.youtube.com/watch?v=SIaFtAKnqBU", // The Screaming Sheep (Original Upload)
  //       "https://www.youtube.com/watch?v=1paueaTWFRE", // Goat Scream - Origine Meme (HD)
  //       "https://www.youtube.com/watch?v=0MuOtw4cSig", // Mickey Mouse Clubhouse But Im Screaming The Lyrics
  //       "https://www.youtube.com/watch?v=sHDMveJ02rg", // Wizard Yensid screaming (meme template)
  //       "https://www.youtube.com/watch?v=7LGTEI1RMoQ", // Old man screaming meme
  //       "https://www.youtube.com/watch?v=x-OfjajZxRo", // Screaming Guy song in HD - AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  //       "https://www.youtube.com/watch?v=5RsOkhR6KBc", // *screams*
  //       "https://www.youtube.com/watch?v=umDr0mPuyQc", // NO GOD! PLEASE NO!!! NOOOOOOOOOO
  //       "https://www.youtube.com/watch?v=paK-qnTp1KI", // Screaming Squirrel Meme (Original) | Sound Effect
  //       "https://www.youtube.com/watch?v=70vN5lVUfO8", // The Orignal Screaming Squirrel
  //       "https://www.youtube.com/watch?v=syNumVb2kUs", // Marmot screaming on Blackcomb Mountain
  //       "https://www.youtube.com/watch?v=OOGTd1vejKw", // Gopher scream
  //       "https://www.youtube.com/watch?v=Br8ffrN1fm0", //[𝗟𝗢𝗨𝗗] The Lion King but it's Meme Scream [𝗟𝗢𝗨𝗗]
  //       "https://www.youtube.com/watch?v=VMIeODpgA_Y", // High pitch scream guy
  //       "https://www.youtube.com/watch?v=mqWZN4ydXRg", // Tyler 1 scream meme
  //       "https://www.youtube.com/watch?v=cVDOh5H32Qc", // SONIC SCREAMING
  //       "https://www.youtube.com/watch?v=2o2BbWks-m8", // Keemstar screaming
  //       "https://www.youtube.com/watch?v=9ohL0oy1zM8", // Robert Downey Jr Scream Meme
  //       "https://www.youtube.com/watch?v=ytSVwETbZtI", // Filthy Frank - Confused Scream Meme
  //       "https://www.youtube.com/watch?v=Bkq1PAyGuZY", // Screaming Mouse
  //     ];
  //     message.channel.send(
  //       screamURLs[Math.floor(Math.random() * (screamURLs.length - 1))]
  //     );
  //     talkedRecently.add(message.author.id);
  //     setTimeout(() => {
  //       talkedRecently.delete(message.author.id);
  //     }, 300000);
  //   }
  // }

  sadcat(message) {
    message.channel.send("https://tenor.com/view/austin-sad-cat-gif-18483293");
  }

  // snake(message) {
  //   if (
  //     message.member.guild.me.hasPermission("MANAGE_MESSAGES") &&
  //     message.member.guild.me.hasPermission("ADD_REACTIONS")
  //   ) {
  //     const GameCord = require("gamecord").djs;
  //     message.channel.send("Você(s) tem 30min.");
  //     new GameCord.SnakeGame(message)
  //       .setTitle("Jogo da Cobrinha")
  //       .setColor("#00FF00")
  //       .setTime(1800000)
  //       // .on("end", (game) =>
  //       //   console.log(
  //       //     `${game.message.author.tag} score: ${game.score}`
  //       //   )
  //       // ) // Start event also exists
  //       .run();
  //   } else {
  //     message.channel.send("Não tenho permissão pra isso =/");
  //   }
  // }

  async rndimg(message, args) {
    if (args[0] == null || args[0] == "") {
      message.channel.send("Tente `jj rndimage [palavra]`.");
    } else {
      const GoogleImages = require("google-images");
      const GoogleImagesClient = new GoogleImages(
        process.env.GOOGLE_CSE_ID,
        process.env.GOOGLE_API_KEY
      );

      let googleimage = await GoogleImagesClient.search(args[0], { page: 1 });
      if (googleimage.length == 0) {
        message.channel.send("Não foram encontradas imagens sobre isso =/");
      } else {
        message.channel.send(
          googleimage[Math.floor(Math.random() * googleimage.length)].url
        );
      }
    }
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
