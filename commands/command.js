const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const config = require("../config.js");
app = initializeApp(config.firebase_config);
db = getFirestore(app);

module.exports = function command(client, message, countCommands) {
    let command_filter = message.content.substr(3).split(" ");
    let command = command_filter[0];
    let args = command_filter.slice(1);

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
        // avatar2circle: () => Fun.avatar2circle(message),
        avatar2pixel: () => Fun.avatar2pixel(message),
        disablelevelingchannel: () => Utils.disablelevelingchannel(db, message),
        discord: () => Utils.discord(message),
        donate: () => Utils.kofi(message),
        github: () => Utils.github(message),
        invite: () => Utils.invite(message),
        setlevelingchannel: () => Utils.setlevelingchannel(db, message, args),

        // LEVELING E ECONOMIA
        coinsranking: () => Ranking.moneyranking(db, message),
        daily: () => Balance.daily(db, message),
        monthly: () => Balance.monthly(db, message),
        xpranking: () => Ranking.xpranking(db, message),
        weekly: () => Balance.weekly(db, message),
        transfer: () => Balance.transfer(db, message, args),

        // ENTRETENIMENTO
        blackjack: () => Fun._blackjack(message, client, db),
        clap: () => Fun.clap(message),
        connect4: () => Fun.connect4(message),
        cookie: () => Fun.cookie(message),
        jokenpo: () => Fun.jokenpo(db, client, message, args),
        rndnote: () => Fun.rndnote(message),
        sadcat: () => Fun.sadcat(message),
        snake: () => Fun.snake(message),
        risitas: () => Fun.risitas(message),
        // word2ascii: () => Fun.word2ascii(message, args),

        // INFO
        bitcoinprice: () => Utils.bitcoinprice(message, args),
        botinfo: () => Info.botinfo(client, message),
        help: () => Utils.help(message),
        ping: () => Utils.ping(client, message),
        profile: () => Profile.profile(db, message, args),
        profilecard: () => Profile.profilecard(db, message),
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

    if (command in commands) {
        commands[command]();
        countCommands[command] = parseInt(countCommands[command]) + 1;
    } else {
        message.channel.send({ content: "\`jj help\` para ver os comandos disponíveis." });
    }
};
