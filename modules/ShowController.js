class ShowController {
  showActivity(client) {
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
    // dnd, idle, online, invisible
    // client.user.setStatus("idle");
  }

  showServers(client) {
    // servidores em que JJao está
    client.guilds.cache.forEach((guild) => {
      console.log(`${guild.id} - ${guild.name}`);
    });
  }
}

module.exports = new ShowController();
