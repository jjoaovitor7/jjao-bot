const { MessageEmbed } = require("discord.js");

const WORLDCUP_YEAR = process.env.WORLDCUP_YEAR || "2026";
const WORLDCUP2026_REPO = "openfootball/worldcup.json";
const WORLDCUP2026_JSON = `https://raw.githubusercontent.com/${WORLDCUP2026_REPO}/refs/heads/master/${WORLDCUP_YEAR}/worldcup.json`;
const WORLDCUP2026_COMMITS = `https://api.github.com/repos/${WORLDCUP2026_REPO}/commits?path=${WORLDCUP_YEAR}/worldcup.json&per_page=1`;

class WorldCup {
  toBRT(timeStr) {
    if (!timeStr) {
      return "";
    }
    const [hourMin, offset] = timeStr.split(" UTC");
    const [h, m] = hourMin.split(":");
    let brt = (+h - 3 - +offset) % 24;
    if (brt < 0) {
      brt += 24;
    }
    return `${String(brt).padStart(2, "0")}:${m} BRT`;
  }

  async fetchData() {
    const [data, commits] = await Promise.all([
      fetch(WORLDCUP2026_JSON).then(r => r.json()),
      fetch(WORLDCUP2026_COMMITS).then(r => r.json())
    ]);

    const date = commits[0]?.commit?.committer?.date;
    let lastUpdate = "-";
    if (date) {
      const d = new Date(date);
      const [datePart, timePart] = d
        .toLocaleString('pt-BR', {
          timeZone: 'America/Bahia',
          hour12: false
        })
        .split(', ');
      lastUpdate = `${datePart} ${(timePart || "").slice(0, 5)} (BRT)`;
    }

    return {
      matches: data.matches,
      lastUpdate
    };
  }

  async worldcup(message, args) {
    try {
      const { matches, lastUpdate } = await this.fetchData();
      const showResults = args[0]?.toLowerCase() === "results";

      const filtered = showResults
        ? matches.filter(m => m.score)
        : matches;

      const input = showResults
        ? args.slice(1).join(" ").trim().toLowerCase()
        : args.join(" ").trim().toLowerCase();

      const score = m => {
        if (!showResults) {
          return "X";
        }

        if (!m.score) {
          return "-";
        }

        return `${m.score.ft[0]}-${m.score.ft[1]}`;
      };

      const line = m => {
        const [, mm, dd] = m.date.split("-");
        return `**${m.team1}** ${score(m)} **${m.team2}**\n${dd}/${mm} ${this.toBRT(m.time)}\n${m.ground}`;
      };

      const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setFooter({ text: `Última atualização: ${lastUpdate}` });

      if (!input) {
        embed.setTitle(`Copa do Mundo ${WORLDCUP_YEAR} - ${showResults ? "Resultados" : "Grupos"}`);
        const groups = [...new Set(filtered.map(m => m.group).filter(Boolean))].sort();
        for (const group of groups) {
          const list = filtered
            .filter(m => m.group === group)
            .map(m => {
              const [, mm, dd] = m.date.split("-");
              return `\`${dd}/${mm}\` ${m.team1} **${score(m)}** ${m.team2}`;
            })
            .join("\n");
          embed.addFields({
            name: group.replace("Group ", "Grupo "),
            value: list,
            inline: true
          });
        }
        message.channel.send({
          embeds: [embed]
        });
        return;
      }

      const groupMatch = input.match(/^(grupo?\s*)?([a-l])$/);
      if (groupMatch) {
        const groupName = `Group ${groupMatch[2].toUpperCase()}`;
        const list = filtered.filter(m => m.group === groupName);
        if (!list.length) {
          message.channel.send(`Grupo ${groupMatch[2].toUpperCase()} não encontrado.`);
          return;
        }
        embed.setTitle(`Copa do Mundo ${WORLDCUP_YEAR} - ${groupName.replace("Group", "Grupo")}`);
        embed.setDescription(list.map(line).join("\n\n"));
        message.channel.send({
          embeds: [embed]
        });
        return;
      }

      const list = filtered.filter(m =>
        m.team1?.toLowerCase().includes(input) ||
        m.team2?.toLowerCase().includes(input)
      );
      if (!list.length) {
        message.channel.send(`Nenhum jogo encontrado para "${input}".`);
        return;
      }

      embed.setTitle(`Copa do Mundo ${WORLDCUP_YEAR} - "${input}"`);
      embed.setDescription(list
        .map(m => {
          const round = m.round.replace(/matchday/i, "Partida");
          return `**${round}**\n${line(m)}`;
        })
        .join("\n\n")
      );
      message.channel.send({
        embeds: [embed]
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new WorldCup();
