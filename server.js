// discord
const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });

// .env
require("dotenv").config();

// modules
const sS = require("./modules/showServers.js");
const sA = require("./modules/showActivity.js");
const lC = require("./modules/levelController.js");

// firebase
const firebase = require("firebase/app");
require("firebase/firestore");

const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

const app = firebase.initializeApp(config);
const database = firebase.firestore(app);

client.on("ready", () => {
  console.log(`Conectado como: ${client.user.tag}`);

  // showServers
  // sS(client);

  // showActivity
  sA(client);
});

let countCommands = {
  avatar: 0,
  avatar2braille: 0,
  avatar2circle: 0,
  avatar2pixel: 0,
  deletelevelupchannel: 0,
  discord: 0,
  donate: 0,
  github: 0,
  invite: 0,
  setlevelupchannel: 0,

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
  rndimg: 0,
  rndnote: 0,
  sadcat: 0,
  snake: 0,
  risitas: 0,
  word2ascii: 0,

  // INFO
  bitcoinprice: 0,
  botinfo: 0,
  brazilcovidcases: 0,
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

  // se digitar "Vingadores"
  if (message.content == "Vingadores") {
    message.channel.send({
      embed: {
        color: "0099ff",
        description: "Avante!",
      },
    });
  }

  // levelController
  lC(client, database, message);

  if (message.content.startsWith(process.env.PREFIX)) {
    let command = require("./commands/command.js");
    command(client, message, database, countCommands);
  }
});

client.login(process.env.TOKEN);
