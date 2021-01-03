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
  command == "cookie"
  ? Fun.cookie(message)
  : null;
  ///

  /// CONNECT4
  command == "connect4"
  ? Fun.connect4(message)
  : null;
  ///

  /// COVIDBRAZIL
  command == "covidbrazilcases"
  ? Info.covidbrazilcases(message)
  : null;
  ///

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
  /////
};
