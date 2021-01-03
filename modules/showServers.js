function showServers(client) {
  // servidores em que JJao está
  client.guilds.cache.forEach((guild) => {
    console.log(`${guild.id} - ${guild.name}`);
  });
}

module.exports = showServers;
