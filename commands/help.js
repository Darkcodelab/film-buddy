const {
  RichEmbed
} = require("discord.js");

module.exports = {
  name: "help",
  description: "Help command",
  execute(client, message, args) {
    var AsciiTable = require("ascii-table");

    var table = new AsciiTable("Help Menu");
    table
      .setHeading("commands", "usage")
      .addRow("help", "!fb help")
      .addRow("ping", "!fb ping")
      .addRow("movie", "!fb movie moviename")
      .addRow("poll", "!fb poll Question1 | Question2")
      .addRow("kick", "!fb kick @member Reason")

    message.channel.send("`" + table.toString() + "`");
  }
};