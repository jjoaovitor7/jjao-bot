module.exports = function command(client, message, database) {
  let commandAux = message.content.substr(3).split(" ");
  let command = commandAux[0];
  let args = commandAux.slice(1);

  let Balance = require("./Classes/Balance.js");
  let Fun = require("./Classes/Fun.js");
  let Info = require("./Classes/Info.js");
  let Jokenpo = require("./Classes/Jokenpo.js");
  let Networks = require("./Classes/Networks.js");
  let Profile = require("./Classes/Profile.js");
  let Ranking = require("./Classes/Ranking.js");
  let Role = require("./Classes/Role.js");
  let Utils = require("./Classes/Utils.js");

  switch (command) {
    // GERAL
    case "avatar":
      Profile.avatar(message);
      break;

    case "avatar2braille":
      Fun.avatar2braille(message);
      break;

    case "avatar2circle":
      Fun.avatar2circle(message);
      break;

    case "avatar2pixel":
      Fun.avatar2pixel(message);
      break;

    case "deletelevelupchannel":
      Utils.deleteLevelUpChannel(database, message);
      break;

    case "discord":
      Networks.discord(message);
      break;

    case "donate":
      Networks.kofi(message);
      break;

    case "github":
      Networks.github(message);
      break;

    case "invite":
      Utils.invite(message);
      break;

    case "setlevelupchannel":
      Utils.setLevelUpChannel(database, message, args);
      break;

    // LEVELING E ECONOMIA
    case "coinsranking":
      Ranking.moneyranking(database, message);
      break;

    case "daily":
      Balance.daily(database, message);
      break;

    case "monthly":
      Balance.monthly(database, message);
      break;

    case "xpranking":
      Ranking.xpranking(database, message);
      break;

    case "weekly":
      Balance.weekly(database, message);
      break;

    // ENTRETENIMENTO
    case "clap":
      Fun.clap(message);
      break;

    case "connect4":
      Fun.connect4(message);
      break;

    case "cookie":
      Fun.cookie(message);
      break;

    case "jokenpo":
      Jokenpo.play(database, client, message, args);
      break;

    case "rndimg":
      Fun.rndimg(message, args);
      break;

    case "rndnote":
      Fun.rndnote(message);
      break;

    case "sadcat":
      Fun.sadcat(message);
      break;

    case "snake":
      Fun.snake(message);
      break;

    case "risitas":
      Fun.risitas(message);
      break;

    case "word2ascii":
      Fun.word2ascii(message, args);
      break;

    // INFO
    case "bitcoinprice":
      Utils.bitcoinprice(message, args);
      break;

    case "botinfo":
      Info.botinfo(client, message);
      break;

    case "brazilcovidcases":
      Info.covidbrazilcases(message);
      break;

    case "help":
      Utils.help(message);
      break;

    case "ping":
      Utils.ping(client, message);
      break;

    case "profile":
      Profile.profile(database, message, args);
      break;

    case "profilecard":
      Profile.profilecard(database, message);
      break;

    case "serverinfo":
      Info.serverinfo(message);
      break;

    case "userinfo":
      Info.userinfo(message);
      break;

    // CARGOS
    // somente administradores
    case "createrole":
      Role.create(message, args);
      break;

    case "enterrole":
      Role.enter(message, args);
      break;

    // somente administradores
    case "deleterole":
      Role.delete(message, args);
      break;

    case "exitrole":
      Role.exit(message, args);
      break;

    // somente administradores
    case "setinrole":
      Role.setin(message, args);
    
    default:
      break;
  }
};
