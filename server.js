const config = require("./config.js");

const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES],
});

let inCooldown = new Set();
const Leveling = require("discord-leveling-firebase");
const leveling = new Leveling(client, config.firebase_config);

let countCommands = {
  avatar: 0,
  avatar2braille: 0,
  // avatar2circle: 0,
  bitcoinprice: 0,
  blackjack: 0,
  botinfo: 0,
  countcommands: 0,
  discord: 0,
  donate: 0,
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
  word2ascii: 0,

  // CARGOS
  createrole: 0,
  enterrole: 0,
  deleterole: 0,
  exitrole: 0,
  setinrole: 0,
};

function showActivity(client) {
  if (client.guilds.cache.size == 0 || client.guilds.cache.size == 1) {
    client.user.setActivity(
      "jj help | " + client.guilds.cache.size + " servidor"
    );
  } else {
    client.user.setActivity(
      "jj help | " + client.guilds.cache.size + " servidores"
    );
  }
  // client.user.setActivity("Em manutenção.");
  // client.user.setStatus("idle"); // dnd, idle, online, invisible
}

client.on("ready", () => {
  console.log(`Conectado como: ${client.user.tag}.`);
  showActivity(client);
});

client.on("messageCreate", async (message) => {
  if (message.author.id == client.user.id || message.author.id == true) {
    return;
  }

  if (message.guild != null) {
    if (
      inCooldown.has(message.guild.id.concat(message.author.id)) &&
      !message.content.startsWith(config.prefix)
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

  if (message.content.startsWith(config.prefix)) {
    let command = require("./commands/command.js");
    command(client, message, countCommands, leveling);
  }
});

client.login(config.token);
