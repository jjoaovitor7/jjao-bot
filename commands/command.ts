import { Client, Message } from "discord.js";
import { prefix } from "../config";
import Balance from "./usecases/Balance";
import Fun from "./usecases/Fun";
import Profile from "./usecases/Profile";
import Utils from "./usecases/Utils";
import WorldCup from "./usecases/WorldCup";

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

export default function command(
  client: Client,
  message: Message<true>,
  countCommands: Record<string, number>,
  Leveling: any
) {
  const args = message.content.substr(3).split(" ");
  const command = args.shift()!;

  const commands: Record<string, () => void> = {
    avatar: () => Profile.avatar(message),
    bitcoinprice: () => Utils.bitcoinprice(message, args),
    botinfo: () => Utils.botinfo(client, message),
    countcommands: () => Utils.countCommands(message, countCommands),
    discord: () => Utils.discord(message),
    help: () => Utils.help(message),
    ping: () => Utils.ping(client, message),
    serverinfo: () => Utils.serverinfo(message),
    worldcup: () => WorldCup.worldcup(message, args),

    coinsranking: () => Balance.moneyranking(message),
    daily: () => Balance.checkToAdd(message, "daily", "Dia"),
    disablelevelingchannel: () => Leveling.disablelevelingchannel(message),
    monthly: () => Balance.checkToAdd(message, "monthly", "Mês"),
    profile: () => Profile.profile(message, args),
    profilecard: () => Profile.profilecard(message),
    setlevelingchannel: () => Leveling.setlevelingchannel(message),
    xpranking: () => Utils.xpranking(message, Leveling),
    weekly: () => Balance.checkToAdd(message, "weekly", "Semana"),
    transfer: () => Balance.transfer(message, args),

    avatar2pixel: () => Fun.avatar2pixel(message),
    blackjack: () => Fun.blackjack(message),
    cookie: () => Fun.cookie(message),
    jokenpo: () => Fun.jokenpo(client, message, args),
    rndnote: () => Fun.rndnote(message),
    snake: () => Fun.snake(message),
    word2ascii: () => Fun.word2ascii(message, args),
  };

  if (command in commands) {
    commands[command]();
    countCommands[command]++;
  } else {
    message.channel.send({
      content: `\`${prefix} help\` para ver os comandos disponíveis.`,
    });
  }
}
