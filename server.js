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
    command(client, message, database);
  }
});

client.login(process.env.TOKEN);
