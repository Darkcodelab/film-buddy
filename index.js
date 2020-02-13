const config = require('./config.json');

const Discord = require("discord.js");
const client = new Discord.Client();

const fetch = require("node-fetch");

const fs = require("fs");
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

const prefix = "!fb";

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(client.user.id);
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const msgArr = message.content.split(" ");
  const command = msgArr[1];
  const args = msgArr.splice(2).join(" ");

  if (!client.commands.has(command)) return;

  try {
    if (command == "ping") {
      client.commands.get(command).execute(message, args);
    } else if (command == "movie") {
      client.commands.get(command).execute(message, args);
    }
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});



client.login(config.token);