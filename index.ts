import config from "./config";
import runServer from "./server";
import command from "./commands/command";

import { Client, GatewayIntentBits, Message, ActivityType } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

const interval = new Set<string>();
import Leveling from "./commands/usecases/Leveling";
const leveling = new Leveling(client);

import Utils from "./commands/usecases/Utils";
const { help } = Utils;

const COMMAND_NAMES = [
  "avatar",
  "bitcoinprice",
  "blackjack",
  "botinfo",
  "countcommands",
  "discord",
  "help",
  "ping",
  "serverinfo",
  "worldcup",
  "coinsranking",
  "daily",
  "disablelevelingchannel",
  "monthly",
  "profile",
  "profilecard",
  "setlevelingchannel",
  "xpranking",
  "weekly",
  "transfer",
  "avatar2pixel",
  "cookie",
  "jokenpo",
  "rndnote",
  "snake",
  "word2ascii",
];

let countCommands: Record<string, number> = Object.fromEntries(
  COMMAND_NAMES.map((name) => [name, 0])
);

client.on("clientReady", () => {
  const size = client.guilds.cache.size;
  const word = [0, 1].includes(size) ? "servidor" : "servidores";

  client.user!.setPresence({
    status: "online",
    activities: [{
      name: `${config.prefix} help | ${size} ${word}`,
      type: ActivityType.Playing,
    }],
  });

  client.guilds.cache.forEach((guild) => {
    guild.commands
      .set([{ name: "help", description: "Comandos disponíveis no bot." }])
      .catch((err: any) => {
        if (err.code === 50001) {
          console.log(`Problema de permissão no servidor "${guild.name}". (${err.code})`);
        }
      });
  });

  console.log(`Conectado como: ${client.user!.tag}.`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "help") {
    interaction
      .reply("Aqui estão os comandos disponíveis do bot.")
      .then(() => help(interaction as any));
  }
});

client.on("messageCreate", async (raw: Message) => {
  if (!raw.guild || raw.author.id == client.user!.id) return;
  if (!raw.channel.isTextBased()) return;
  const message = raw as Message<true>;

  const key = `${message.guild.id}${message.author.id}`;

  if (!interval.has(key) && message.content.startsWith(config.prefix)) {
    leveling.leveling(message).catch(console.log);
    interval.add(key);
    setTimeout(() => interval.delete(key), 5000);
  }

  if (message.content.startsWith(config.prefix)) {
    command(client, message, countCommands, leveling);
  }
});

client.login(config.token);
runServer();
