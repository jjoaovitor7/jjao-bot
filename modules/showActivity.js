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
  // dnd, idle, online, invisible
  // client.user.setStatus("idle");
}

module.exports = showActivity;
