const config = require("./config.js");

const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ],
});

let interval = new Set();
const _Leveling = require("discord-leveling-firebase");
const Leveling = new _Leveling(client, config.firebase_config);

let countCommands = {
  avatar: 0,
  avatar2braille: 0,
  // avatar2circle: 0,
  bitcoinprice: 0,
  blackjack: 0,
  botinfo: 0,
  countcommands: 0,
  discord: 0,
  github: 0,
  help: 0,
  invite: 0,
  ping: 0,
  serverinfo: 0,

  // LEVELING E ECONOMIA
  coinsranking: 0,
  daily: 0,
  disablelevelingchannel: 0,
  monthly: 0,
  profile: 0,
  profilecard: 0,
  setlevelingchannel: 0,
  xpranking: 0,
  weekly: 0,

  // ENTRETENIMENTO
  avatar2pixel: 0,
  clap: 0,
  cookie: 0,
  jokenpo: 0,
  rndnote: 0,
  sadcat: 0,
  snake: 0,
  risitas: 0,
  word2ascii: 0
};

client.on("ready", () => {
  let word = "servidores";
  [0, 1].includes(client.guilds.cache.size) ? word = "servidor" : word = "servidores";
  client.user.setActivity(`jj help | ${client.guilds.cache.size} ${word}`);
  // client.user.setActivity("Em manutenção.");
  // client.user.setStatus("idle"); // dnd, idle, online, invisible
  console.log(`Conectado como: ${client.user.tag}.`);
});

client.on("messageCreate", async (message) => {
  if (message.guild === null || message.guild === undefined
    || message.author.id == client.user.id) {
    return;
  }

  if (!(interval.has(`${message.guild.id}${message.author.id}`))
    && message.content.startsWith(config.prefix)) {
    Leveling.leveling(message);
    interval.add(message.guild.id.concat(message.author.id));
    setTimeout(() => interval.delete(message.guild.id.concat(message.author.id)), 5000);
  }

  if (message.content.startsWith(config.prefix)) {
    const command = require("./commands/command.js");
    command(client, message, countCommands, Leveling);
  }
});

client.login(config.token);
