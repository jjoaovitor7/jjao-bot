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
            ).then(function(img) {
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
            ).then(function(img) {
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
            ).then(function(img) {
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
            ).then(function(img) {
                const attachment = new Discord.MessageAttachment(img, "circle.png");
                message.channel.send(attachment);
            });
        }
    }

    async _blackjack(message, client, database) {
        let game = await blackjack(message, client);
        let random;
        switch (game.result) {
            case "Win":
                random = Math.floor(Math.random() * 100);
                database
                    .collection("Usuarios")
                    .doc(message.guild.id)
                    .collection("Usuarios")
                    .where("id", "==", message.author.id)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(documentSnapshot) {
                            database
                                .collection("Usuarios")
                                .doc(message.guild.id)
                                .collection("Usuarios")
                                .doc(documentSnapshot.id).update({ money: documentSnapshot.data().money + random });
                        });
                    });
                message.channel.send(`Você ganhou ${random} coins!`);
                break;
            case "Lose":
                random = Math.floor(Math.random() * 80);
                database
                    .collection("Usuarios")
                    .doc(message.guild.id)
                    .collection("Usuarios")
                    .where("id", "==", message.author.id)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(documentSnapshot) {
                            database
                                .collection("Usuarios")
                                .doc(message.guild.id)
                                .collection("Usuarios")
                                .doc(documentSnapshot.id).update({ money: documentSnapshot.data().money - random });
                        });
                    });
                message.channel.send(`Você perdeu ${random} coins!`);
                break;
            default:
                break;
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
            .then(function(response) {
                message.channel.send({
                    embed: {
                        description: ":fortune_cookie: Biscoito da Sorte (em inglês)\n" +
                            response.data,
                        footer: {
                            text: "https://helloacm.com/api/fortune/",
                        },
                    },
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    jokenpo(database, client, message, args) {
        const _Jokenpo = require("discord-jokenpo");
        const Jokenpo = new _Jokenpo("Tente .jokenpo `[pedra|papel|tesoura]`.\nex.: `.jokenpo pedra`", "pt-br", "Empate!", `<@${client.user.id}> ganhou.`, `<@${message.author.id}> ganhou.`, message, args);

        const result = Jokenpo.play();
        if (result.player == false && result.player == false) {
        }
        else if (result.bot == true) {
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
                  .doc(documentSnapshot.id).update({money: documentSnapshot.data().money - random});
              });
            });
        }
        else if (result.player == true) {
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
                    .doc(documentSnapshot.id).update({money: documentSnapshot.data().money + random});
                });
              });
        }
    }

    risitas(message) {
        message.channel.send("https://www.youtube.com/watch?v=QT13kk8HDDo");
    }

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
                .then(function(response) {
                    message.channel.send(`\`\`\`${response.data}\`\`\``);
                })
                .catch(function(error) {
                    console.log(error);
                })
                .then(function() {});
        }
    }
}

module.exports = new Fun();