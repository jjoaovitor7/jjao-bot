require("dotenv").config();

const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
  disableEveryone: true,
});

const ShowController = require("./modules/ShowController.js");
let inCooldown = new Set();

const Leveling = require("discord-leveling-firebase");
const leveling = new Leveling(client, {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
});

client.on("ready", () => {
  console.log(`Conectado como: ${client.user.tag}.`);
  ShowController.showActivity(client);
});

let countCommands = {
  avatar: 0,
  avatar2braille: 0,
  avatar2circle: 0,
  avatar2pixel: 0,
  disablelevelingchannel: 0,
  discord: 0,
  donate: 0,
  github: 0,
  invite: 0,
  setlevelingchannel: 0,

  // LEVELING E ECONOMIA
  coinsranking: 0,
  daily: 0,
  monthly: 0,
  xpranking: 0,
  weekly: 0,

  // ENTRETENIMENTO
  clap: 0,
  connect4: 0,
  cookie: 0,
  jokenpo: 0,
  rndnote: 0,
  sadcat: 0,
  snake: 0,
  risitas: 0,
  word2ascii: 0,

  // INFO
  bitcoinprice: 0,
  botinfo: 0,
  help: 0,
  ping: 0,
  profile: 0,
  profilecard: 0,
  serverinfo: 0,
  userinfo: 0,
  countcommands: 0,

  // CARGOS
  createrole: 0,
  enterrole: 0,
  deleterole: 0,
  exitrole: 0,
  setinrole: 0,
};

client.on("message", async (message) => {
  // se a mensagem for do próprio bot, ignore-a
  if (message.author.id == client.user.id) {
    return;
  }

  // se a mensagem for de um outro bot, ignore-a
  if (message.author.bot == true) {
    return;
  }

  if (message.guild != null) {
    if (
      inCooldown.has(message.guild.id.concat(message.author.id)) &&
      !message.content.startsWith(process.env.PREFIX)
    ) {
      return;
    } else {
      leveling.leveling(message);
      inCooldown.add(message.guild.id.concat(message.author.id));
      setTimeout(
        () => inCooldown.delete(message.guild.id.concat(message.author.id)),
        5000
      );
    }
  }

  if (message.content.startsWith(process.env.PREFIX)) {
    let command = require("./commands/command.js");
    command(client, message, countCommands);
  }
});

client.login(process.env.TOKEN);
