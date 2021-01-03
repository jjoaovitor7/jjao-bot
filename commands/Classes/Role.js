class Role {
  create(message, args) {
    if (message.channel.type == "dm") {
      message.reply("Esse comando só pode ser usado em servidor.");
    } else {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (message.member.guild.me.hasPermission("MANAGE_ROLES")) {
          let cargoName = args[0];
          let cargoAux = message.guild.roles.cache.find(
            (x) => x.name === cargoName
          );
          if (typeof cargoAux == "undefined") {
            // criar role
            message.member.guild.roles.create({
              data: {
                name: args[0],
                color: args[1] || "010101",
              },
            });
            message.channel.send("Cargo criado.");
          } else {
            message.channel.send("Esse cargo já foi criado.");
          }
        } else {
          message.channel.send("Não possuo a permissão MANAGE_ROLES =/");
        }
      } else {
        message.channel.send(
          "Somente administradores podem usar esse comando."
        );
      }
    }
  }

  enter(message, args) {
    if (message.channel.type == "dm") {
      message.reply("Esse comando só pode ser usado em servidor.");
    } else {
      let cargoName = args[0];

      let cargo = message.member.guild.roles.cache.find(
        (role) => role.name == cargoName
      );
      message.member.roles.add(cargo);
    }
  }

  delete(message, args) {
    if (message.channel.type == "dm") {
      message.reply("Esse comando só pode ser usado em servidor.");
    } else {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (message.member.guild.me.hasPermission("MANAGE_ROLES")) {
          let cargoName = args[0];

          let cargo = message.member.guild.roles.cache.find(
            (role) => role.name == cargoName
          );

          cargo.delete();
          message.channel.send("Cargo deletado.");
        } else {
          message.channel.send("Não possuo a permissão MANAGE_ROLES =/");
        }
      } else {
        message.channel.send(
          "Somente administradores podem usar esse comando."
        );
      }
    }
  }

  exit(message, args) {
    if (message.channel.type == "dm") {
      message.reply("Esse comando só pode ser usado em servidor.");
    } else {
      let cargoName = args[0];

      let cargo = message.member.guild.roles.cache.find(
        (role) => role.name == cargoName
      );

      message.member.roles.remove(cargo);
    }
  }

  setin(message, args) {
    if (message.channel.type == "dm") {
      message.reply("Esse comando só pode ser usado em servidor.");
    } else {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        let user = message.mentions.users.first();
        let cargoName = args[1];

        let cargo = message.member.guild.roles.cache.find(
          (role) => role.name == cargoName
        );
        message.guild.members.cache.get(user.id).roles.add(cargo);
      } else {
        message.channel.send(
          "Somente administradores podem usar esse comando."
        );
      }
    }
  }
}

module.exports = Role;
