import { EmbedBuilder, Message } from "discord.js";
const WORLDCUP_YEAR = process.env.WORLDCUP_YEAR || "2026";
const WORLDCUP_REPO = "openfootball/worldcup.json";
const WORLDCUP_JSON = `https://raw.githubusercontent.com/${WORLDCUP_REPO}/refs/heads/master/${WORLDCUP_YEAR}/worldcup.json`;
const WORLDCUP_COMMITS = `https://api.github.com/repos/${WORLDCUP_REPO}/commits?path=${WORLDCUP_YEAR}/worldcup.json&per_page=1`;

interface Match {
  date: string;
  team1: string;
  team2: string;
  time?: string;
  ground?: string;
  group?: string;
  round?: string;
  score?: { ft: [number, number] };
}

class WorldCup {
  private toBRT(timeStr: string): string {
    if (!timeStr) return "";
    const [hourMin, offset] = timeStr.split(" UTC");
    const [h, m] = hourMin.split(":");
    let brt = (+h - 3 - +offset) % 24;
    if (brt < 0) brt += 24;
    return `${String(brt).padStart(2, "0")}:${m} BRT`;
  }

  private async fetchData() {
    const results = await Promise.all([
      fetch(WORLDCUP_JSON).then((r) => r.json()),
      fetch(WORLDCUP_COMMITS).then((r) => r.json()),
    ]);
    const data = results[0] as any;
    const commits = results[1] as any[];

    const date = commits[0]?.commit?.committer?.date;
    let lastUpdate = "-";
    if (date) {
      const d = new Date(date);
      const [datePart, timePart = ""] = d
        .toLocaleString("pt-BR", { timeZone: "America/Bahia", hour12: false })
        .split(", ");
      lastUpdate = `${datePart} ${timePart.slice(0, 5)} (BRT)`;
    }

    return { matches: data.matches as Match[], lastUpdate };
  }

  async worldcup(message: Message<true>, args: string[]) {
    try {
      const { matches, lastUpdate } = await this.fetchData();
      const showResults = args[0]?.toLowerCase() === "results";

      const filtered = showResults ? matches.filter((m) => m.score) : matches;

      const input = showResults
        ? args.slice(1).join(" ").trim().toLowerCase()
        : args.join(" ").trim().toLowerCase();

      const score = (m: Match) => {
        if (!showResults) return "X";
        return m.score ? `${m.score.ft[0]}-${m.score.ft[1]}` : "-";
      };

      const line = (m: Match) => {
        const [, mm, dd] = m.date.split("-");
        return `**${m.team1}** ${score(m)} **${m.team2}**\n${dd}/${mm} ${this.toBRT(m.time || "")}\n${m.ground || ""}`;
      };

      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setFooter({ text: `Última atualização: ${lastUpdate}` });

      if (!input) {
        embed.setTitle(`Copa do Mundo ${WORLDCUP_YEAR} - ${showResults ? "Resultados" : "Grupos"}`);
        const groups = [...new Set(filtered.map((m) => m.group).filter(Boolean) as string[])];
        for (const group of groups.sort()) {
          embed.addFields({
            name: group.replace("Group ", "Grupo "),
            value: filtered
              .filter((m) => m.group === group)
              .map((m) => {
                const [, mm, dd] = m.date.split("-");
                return `\`${dd}/${mm}\` ${m.team1} **${score(m)}** ${m.team2}`;
              })
              .join("\n"),
            inline: true,
          });
        }
        message.channel.send({ embeds: [embed] });
        return;
      }

      const groupMatch = input.match(/^(grupo?\s*)?([a-l])$/);
      if (groupMatch) {
        const groupName = `Group ${groupMatch[2].toUpperCase()}`;
        const list = filtered.filter((m) => m.group === groupName);
        if (!list.length) {
          message.channel.send(`Grupo ${groupMatch[2].toUpperCase()} não encontrado.`);
          return;
        }
        embed
          .setTitle(`Copa do Mundo ${WORLDCUP_YEAR} - ${groupName.replace("Group", "Grupo")}`)
          .setDescription(list.map(line).join("\n\n"));
        message.channel.send({ embeds: [embed] });
        return;
      }

      const list = filtered.filter(
        (m) => m.team1?.toLowerCase().includes(input) || m.team2?.toLowerCase().includes(input)
      );
      if (!list.length) {
        message.channel.send(`Nenhum jogo encontrado para "${input}".`);
        return;
      }

      embed
        .setTitle(`Copa do Mundo ${WORLDCUP_YEAR} - "${input}"`)
        .setDescription(
          list
            .map((m) => `**${(m.round || "").replace(/matchday/i, "Partida")}**\n${line(m)}`)
            .join("\n\n")
        );
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  }
}

export default new WorldCup();
