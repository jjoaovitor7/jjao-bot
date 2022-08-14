const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const config = require("../config.js");
app = initializeApp(config.firebase_config);
db = getFirestore(app);

module.exports = function command(client, message, countCommands, Leveling) {
    const command_filter = message.content.substr(3).split(" ");
    const command = command_filter[0];
    const args = command_filter.slice(1);

    const Balance = require("./Classes/Balance.js");
    const Fun = require("./Classes/Fun.js");
    const Profile = require("./Classes/Profile.js");
    const Utils = require("./Classes/Utils.js");

    let commands = {
        // GERAL
        avatar: () => Profile.avatar(message),
        bitcoinprice: () => Utils.bitcoinprice(message, args),
        botinfo: () => Utils.botinfo(client, message),
        countcommands: () => Utils.countCommands(message, countCommands),
        discord: () => Utils.networks(message, "discord"),
        help: () => Utils.help(message),
        ping: () => Utils.ping(client, message),
        serverinfo: () => Utils.serverinfo(message),

        // LEVELING E ECONOMIA
        coinsranking: () => Balance.moneyranking(db, message),
        daily: () => Balance.checkToAdd(db, message, "daily", "Dia"),
        disablelevelingchannel: () => Leveling.disablelevelingchannel(message),
        monthly: () => Balance.checkToAdd(db, message, "monthly", "Mês"),
        profile: () => Profile.profile(db, message, args),
        profilecard: () => Profile.profilecard(db, message),
        setlevelingchannel: () => Leveling.setlevelingchannel(message, args),
        xpranking: () => Utils.xpranking(message, Leveling),
        weekly: () => Balance.checkToAdd(db, message, "weekly", "Semana"),
        transfer: () => Balance.transfer(db, message, args),

        // ENTRETENIMENTO
        avatar2pixel: () => Fun.avatar2pixel(message),
        blackjack: () => Fun.blackjack(message),
        cookie: () => Fun.cookie(message),
        jokenpo: () => Fun.jokenpo(db, client, message, args),
        rndnote: () => Fun.rndnote(message),
        snake: () => Fun.snake(message),
        word2ascii: () => Fun.word2ascii(message, args)
    };

    if (command in commands) {
        commands[command]();
        countCommands[command] = parseInt(countCommands[command]) + 1;
    } else {
        message.channel.send({ content: "\`jj help\` para ver os comandos disponíveis." });
    }
};
