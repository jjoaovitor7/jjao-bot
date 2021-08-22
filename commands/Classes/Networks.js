class Networks {
  discord(message) {
    message.channel.send("https://discord.gg/zz2MSDWk9a");
  }

  github(message) {
    message.channel.send("https://github.com/jjoaovitor7/jjao-bot");
  }

  kofi(message) {
    message.channel.send("https://ko-fi.com/jjoaovitor7");
  }
}

module.exports = new Networks();
