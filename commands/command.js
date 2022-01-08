module.exports = function command(client, message, database, countCommands) {
    let commandAux = message.content.substr(3).split(" ");
    let command = commandAux[0];
    let args = commandAux.slice(1);

    let Balance = require("./Classes/Balance.js");
    let Fun = require("./Classes/Fun.js");
    let Info = require("./Classes/Info.js");
    let Profile = require("./Classes/Profile.js");
    let Ranking = require("./Classes/Ranking.js");
    let Role = require("./Classes/Role.js");
    let Utils = require("./Classes/Utils.js");

    let commands = {
        // GERAL
        avatar: () => Profile.avatar(message),
        avatar2braille: () => Fun.avatar2braille(message),
        avatar2circle: () => Fun.avatar2circle(message),
        avatar2pixel: () => Fun.avatar2pixel(message),
        deletelevelupchannel: () => Utils.deleteLevelUpChannel(database, message),
        discord: () => Utils.discord(message),
        donate: () => Utils.kofi(message),
        github: () => Utils.github(message),
        invite: () => Utils.invite(message),
        setlevelupchannel: () => Utils.setLevelUpChannel(database, message, args),

        // LEVELING E ECONOMIA
        coinsranking: () => Ranking.moneyranking(database, message),
        daily: () => Balance.daily(database, message),
        monthly: () => Balance.monthly(database, message),
        xpranking: () => Ranking.xpranking(database, message),
        weekly: () => Balance.weekly(database, message),
        transfer: () => Balance.transfer(database, message, args),

        // ENTRETENIMENTO
        blackjack: () => Fun._blackjack(message, client, database),
        clap: () => Fun.clap(message),
        connect4: () => Fun.connect4(message),
        cookie: () => Fun.cookie(message),
        jokenpo: () => Fun.jokenpo(database, client, message, args),
        rndnote: () => Fun.rndnote(message),
        sadcat: () => Fun.sadcat(message),
        snake: () => Fun.snake(message),
        risitas: () => Fun.risitas(message),
        word2ascii: () => Fun.word2ascii(message, args),

        // INFO
        bitcoinprice: () => Utils.bitcoinprice(message, args),
        botinfo: () => Info.botinfo(client, message),
        help: () => Utils.help(message),
        ping: () => Utils.ping(client, message),
        profile: () => Profile.profile(database, message, args),
        profilecard: () => Profile.profilecard(database, message),
        serverinfo: () => Info.serverinfo(message),
        userinfo: () => Info.userinfo(message),
        countcommands: () => Info.countCommands(message, countCommands),

        // CARGOS
        createrole: () => Role.create(message, args), // somente administradores
        enterrole: () => Role.enter(message, args),
        deleterole: () => Role.delete(message, args), // somente administradores
        exitrole: () => Role.exit(message, args),
        setinrole: () => Role.setin(message, args), // somente administradores
    };

    commands[command]();
    countCommands[command] = parseInt(countCommands[command]) + 1;
};