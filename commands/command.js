const talkedRecently = new Set();

module.exports = async function command(client, message, database) {
  let commandAux = message.content.substr(3).split(" ");
  let command = commandAux[0];
  let args = commandAux.slice(1);

  ///// Instanciando classes
  /// BALANCE
  let Balance = require("./Classes/Balance.js");
  Balance = new Balance();
  ///

  /// FUN
  let Fun = require("./Classes/Fun.js");
  Fun = new Fun();
  ///

  /// INFO
  let Info = require("./Classes/Info.js");
  Info = new Info();
  ///

  /// JOKENPO
  let Jokenpo = require("./Classes/Jokenpo.js");
  Jokenpo = new Jokenpo();
  ///

  /// NETWORKS
  let Networks = require("./Classes/Networks.js");
  Networks = new Networks();
  ///

  /// PROFILE
  let Profile = require("./Classes/Profile.js");
  Profile = new Profile();
  ///

  /// RANKING
  let Ranking = require("./Classes/Ranking.js");
  Ranking = new Ranking();
  ///

  /// ROLE
  let Role = require("./Classes/Role.js");
  Role = new Role();
  ///

  /// UTILS
  let Utils = require("./Classes/Utils.js");
  Utils = new Utils();
  ///
  /////

  ///// GERAL
  /// AVATAR
  command == "avatar"
  ? Profile.avatar(message)
  : null;

  command == "avatar2braille"
  ? Fun.avatar2braille(message)
  : null;

  command == "avatar2circle"
  ? Fun.avatar2circle(message)
  : null;

  command == "avatar2pixel"
  ? Fun.avatar2pixel(message)
  : null;
  ///

  /// BITCOINPRICE
  command == "bitcoinprice"
  ? Utils.bitcoinprice(message, args)
  : null;
  ///

  /// BOTINFO
  command == "botinfo"
  ? Info.botinfo(client, message)
  : null;
  ///

  /// CLAP/APLAUSES
  command == "clap"
  ? Fun.clap(message)
  : null;

  /// COINSRANKING
  command == "coinsranking"
  ? Ranking.moneyranking(database, message)
  : null;
  ///

  /// COOKIE
  if (command == "cookie") {
    const axios = require("axios");

    axios.get('https://helloacm.com/api/fortune/')
    .then(function (response) {
      message.channel.send(
        {
          embed:
        {
          description: ":fortune_cookie: Biscoito da Sorte (em inglês)\n" + response.data,
          footer: {
            text: "https://helloacm.com/api/fortune/"
          }
        }
      }
      );
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
    });
  }
  ///

  /// CONNECT4
  command == "connect4"
  ? Fun.connect4(message)
  : null;
  ///

  /// COVIDBRAZIL
  if (command == "covidbrazilcases") {
    const axios = require("axios");

    axios
      .get("https://covid19-brazil-api.now.sh/api/report/v1")
      .then(function (response) {
        arrCovid = [];
        for (let i=0; i < response.data.data.length; i++) {
          arrCovid.push((response.data.data[i].state + ": " + response.data.data[i].cases + "\n")) ;
        }
        message.channel.send({
          embed: {
            title: ":syringe: Casos de COVID-19 no Brasil (por estado)",
            description: arrCovid.sort().join("").toString(),
            footer: {
              text: "https://covid19-brazil-api.now.sh/api/report/v1",
            },
          },
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
  }

  /// DELETELEVELUPCHANNEL
  command == "deletelevelupchannel"
  ? Utils.deleteLevelUpChannel(database, message)
  : null;
  ///

  /// DISCORD
  command == "discord"
  ? Networks.discord(message)
  : null;
  ///

  /// DONATE
  command == "donate"
  ? Networks.kofi(message)
  : null;
  ///

  /// GIFT
  // let schedule = require("node-schedule");

  // let j = schedule.scheduleJob("* * * 12 25 *", async function(){
//     if (command == "gift") {
//       lrandom = Math.floor(Math.random() * 6);
//       mrandom = Math.floor(Math.random() * 500);

//       m = await message.channel.send("Você recebeu um presente!\n:gift: :open_mouth:");
      
//       setTimeout(() => {
//         m.edit(`${lrandom} level(is) e ${mrandom} moeda(s)! :partying_face:`);
//       }, 5000);

//       let docReferenceAux = database.collection("Usuarios").doc(message.guild.id);

//       let docReference = docReferenceAux
//         .collection("Usuarios")
//         .doc(message.author.id);
        
//       docReference.get().then((docSnapshot) => {
//         if (docSnapshot.exists) {
//         docReference
//           .update({
//             level: docSnapshot.data().level + lrandom,
//             money: docSnapshot.data().money + mrandom,
//           })
//           .then(function () {
//             console.log("Presente!");
//           })
//           .catch(function (error) {
//             console.error(error);
//             console.log("Erro!");
//           });
//         }
//       });
//     // j.cancel();
//   }
// // });
  ///

  /// GITHUB
  command == "github"
  ? Networks.github(message)
  : null;
  ///

  /// GRITO
  command == "gritar"
  ? Fun.gritar(message, talkedRecently)
  : null;

  command == "gritaum"
  ? Fun.gritaum(message, talkedRecently)
  : null;
  ///

  /// HELP
  command == "help"
  ? Utils.help(message)
  : null;
  ///

  /// INVITE
  command == "invite"
  ? Utils.invite(message)
  : null;
  ///

  /// JOKENPO
  command == "jokenpo"
  ? Jokenpo.play(database, client, message, args)
  : null;
  ///

  // if (command == "messageoffchannel") {
  //   let channel = client.channels.cache.get(args[0].replace("<#", "").replace(">", ""));z
  //   console.log(channel);
  // }

  /// PING
  command == "ping"
  ? Utils.ping(client, message)
  : null;
  ///

  /// RANDOMIMAGE
  command == "rndimg" 
  ? Fun.rndimg(message, args)
  : null;
  ///

  /// RANDOMNOTE
  command == "rndnote"
  ? Fun.rndnote(message)
  : null;
  ///

  /// SNAKE
  command == "snake"
  ? Fun.snake(message)
  : null;
  ///

  /// SADCAT
  command == "sadcat"
  ? Fun.sadcat(message)
  : null;
  ///

  /// SERVERINFO
  command == "serverinfo"
  ? Info.serverinfo(message)
  : null;
  ///

  /// LEADERBOARD
  command == "xpranking"
  ? Ranking.xpranking(database, message)
  : null;
  ///

  /// PROFILE
  command == "profile"
  ? Profile.profile(database, message, args)
  : null;
  ///

  /// PROFILECARD
  command == "profilecard"
  ? Profile.profilecard(database, message)
  : null;
  ///

  /// RISITAS
  command == "risitas"
  ? Fun.risitas(message)
  : null;
  ///

  /// SETLEVELUPCHANNEL
  command == "setlevelupchannel"
  ? Utils.setLevelUpChannel(database, message, args)
  : null;
  ///

  // /// USERINFO
  // command == "userinfo"
  // ? Info.userinfo(message)
  // : null;
  // ///
  /////

  /// WORD2ASCII
  command == "word2ascii"
  ? Fun.word2ascii(message, args)
  : null;
  ///

  ///// BALANCE
  /// DAILY
  command == "daily"
  ? Balance.daily(database, message)
  : null;
  ///

  /// WEEKLY
  command == "weekly"
  ? Balance.weekly(database, message)
  : null;
  ///

  /// MONTHLY
  command == "monthly"
  ? Balance.monthly(database, message)
  : null;
  ///
  /////

  ///// ROLES
  /// CREATEROLE
  command == "createrole" 
  // somente administradores
  ? Role.create(message, args)
  : null;
  ///

  /// ENTERROLE
  command == "enterrole"
  ? Role.enter(message, args)
  : null;
  ///

  /// DELETEROLE
  command == "deleterole"
  // somente administradores
  ? Role.delete(message, args)
  : null;
  ///

  /// EXITROLE
  command == "exitrole"
  ? Role.exit(message, args)
  : null;
  ///

  /// SETINROLE
  command == "setinrole"
  // somente administradores
  ? Role.setin(message, args)
  : null;
  ///

  /// STACKGAME
  // if (command == "stackgamecreate") {
  //   const axios = require("axios");

  //   function createGame() {
  //     axios
  //       .get(`https://thegameapi.herokuapp.com/new/${args[0]}/${args[1]}`)
  //       .then(function (response) {
  //         message.channel.send({embed: {description: `Cores: ${response.data.colors}
  //         Jogo:\n${JSON.stringify(response.data.game)}
  //         ID: ${response.data.id}
  //         Seed: ${response.data.seed}
  //         Status: ${response.data.status}`}});
  //       })
  //       .catch(function (error) {
  //         message.channel.send(error);
  //       });
  //   }

  // createGame();

  // }

  // if (command == "stackgameplay") {
  //   const axios = require("axios");

  //   function playGame(id) {
  //     axios
  //       .get(`https://thegameapi.herokuapp.com/game/${id}`)
  //       .then(async function (response) {
  //         message.channel.send({embed: {description: `Cores: ${response.data.colors}
  //         Jogo:\n${JSON.stringify(response.data.game)}
  //         ID: ${response.data.id}
  //         Seed: ${response.data.seed}
  //         Status: ${response.data.status}`}});
    
  //         let msg = await message.channel.send({embed: {description: "Processando..."}});

  //         let exclude = [];
  //         let movimentos = 0;
  //         while (response.data.status == "incomplete") {
  //           msg.edit({embed: {description: "Processando..."}});
  //           let random1 = Math.floor(Math.random() * response.data.game.length - 1);
  //           let random2 = Math.floor(Math.random() * response.data.game.length - 1);
  //           let from = random1;
  //           let to = random2;
    
            
  //           if (exclude.includes(random1) || exclude.includes(random2)) {
  //             from = 0;
  //             to = 0;
  //           }
    
  //           await axios
  //             .post(`https://thegameapi.herokuapp.com/game/${response.data.id}`, {
  //               from: from,
  //               to: to,
  //             })
  //             .then(async (res) => {
  //               // console.log(res.data.game);
  //               response = res;
  //               movimentos++;
    
  //               for (let i = 0; i < res.data.game.length; i++) {
  //                 const allEqual = (arr) => arr.every((val) => val === arr[0]);
  //                 if (
  //                   response.data.game[i].length == response.data.colors &&
  //                   allEqual(response.data.game[i])
  //                 ) {
  //                   exclude.push(i);
  //                 }
  //               }
  //             });
    
  //           if (response.data.status == "complete") {
  //             msg.edit({embed:{description: `Jogo:\n${JSON.stringify(response.data.game)}\nMovimentos: ${movimentos}`}});

  //             axios
  //               .delete(`https://thegameapi.herokuapp.com/game/${response.data.id}`)
  //               .then(function (response) {
  //                 message.channel.send({embed: {description: response.data}});
  //               })
  //               .catch(function (error) {
  //                 message.channel.send(error);
  //               })
  //           }
  //           console.log(response.data.status);
  //         }
  //       })
  //       .catch(function (error) {
  //         message.channel.send(error);
  //       });
  //   }
  //   playGame(args[0]);
  // }
  ///
  /////
};
