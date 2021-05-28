module.exports = function command(client, message, database) {
  let commandAux = message.content.substr(3).split(" ");
  let command = commandAux[0];
  let args = commandAux.slice(1);


  ///// Instanciando classes
  let Balance = require("./Classes/Balance.js");
  let Fun = require("./Classes/Fun.js");
  let Info = require("./Classes/Info.js");
  let Jokenpo = require("./Classes/Jokenpo.js");
  let Networks = require("./Classes/Networks.js");
  let Profile = require("./Classes/Profile.js");
  let Ranking = require("./Classes/Ranking.js");
  let Role = require("./Classes/Role.js");
  let Utils = require("./Classes/Utils.js");


  /// GERAL
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

  command == "deletelevelupchannel"
  ? Utils.deleteLevelUpChannel(database, message)
  : null;

  command == "discord"
  ? Networks.discord(message)
  : null;

  command == "donate"
  ? Networks.kofi(message)
  : null;

  command == "github"
  ? Networks.github(message)
  : null;

  command == "invite"
  ? Utils.invite(message)
  : null;
  
  command == "setlevelupchannel"
  ? Utils.setLevelUpChannel(database, message, args)
  : null;


  /// LEVELING E ECONOMIA
  command == "coinsranking"
  ? Ranking.moneyranking(database, message)
  : null;

  command == "daily"
  ? Balance.daily(database, message)
  : null;

  command == "monthly"
  ? Balance.monthly(database, message)
  : null;

  command == "xpranking"
  ? Ranking.xpranking(database, message)
  : null;

  command == "weekly"
  ? Balance.weekly(database, message)
  : null;

  
  /// ENTRETENIMENTO
  command == "clap"
  ? Fun.clap(message)
  : null;

  command == "connect4"
  ? Fun.connect4(message)
  : null;

  command == "cookie"
  ? Fun.cookie(message)
  : null;

  command == "jokenpo"
  ? Jokenpo.play(database, client, message, args)
  : null;

   command == "rndimg" 
  ? Fun.rndimg(message, args)
  : null;

  command == "rndnote"
  ? Fun.rndnote(message)
  : null;

  command == "sadcat"
  ? Fun.sadcat(message)
  : null;

  command == "snake"
  ? Fun.snake(message)
  : null;

  command == "risitas"
  ? Fun.risitas(message)
  : null;

  command == "word2ascii"
  ? Fun.word2ascii(message, args)
  : null;

 
  /// INFO
  command == "bitcoinprice"
  ? Utils.bitcoinprice(message, args)
  : null;

  command == "botinfo"
  ? Info.botinfo(client, message)
  : null;

  command == "brazilcovidcases"
  ? Info.covidbrazilcases(message)
  : null;

  command == "help"
  ? Utils.help(message)
  : null;

  command == "ping"
  ? Utils.ping(client, message)
  : null;

  command == "profile"
  ? Profile.profile(database, message, args)
  : null;

  command == "profilecard"
  ? Profile.profilecard(database, message)
  : null;

  command == "serverinfo"
  ? Info.serverinfo(message)
  : null;

  // command == "userinfo"
  // ? Info.userinfo(message)
  // : null;


  /// CARGOS
  // somente administradores
  command == "createrole" 
  ? Role.create(message, args)
  : null;

  command == "enterrole"
  ? Role.enter(message, args)
  : null;

  // somente administradores
  command == "deleterole"
  ? Role.delete(message, args)
  : null;

  command == "exitrole"
  ? Role.exit(message, args)
  : null;

  // somente administradores
  command == "setinrole"
  ? Role.setin(message, args)
  : null;
};
