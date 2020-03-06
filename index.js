//IMPORTS
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
//IMPORTS

//COMMAND HANDLING
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
//COMMAND HANDLING

//PREFIX
const prefix = "!fb";
//PREFIX

//BOT ON READY
client.on("ready", () => {
  console.log(client.user.id);
});
//BOT ON READY

//BOT ON MESSAGE
client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return; //we don't want our bot to reply to its own messages

  const msgArr = message.content.split(" "); //splitting the message and storing it as an array
  const command = msgArr[1]; //COMMAND
  const args = msgArr.splice(2).join(" "); //changing an array to a string

  if (!client.commands.has(command)) return;


  try {
    if (command == "ping") {
      client.commands.get(command).execute(client, message, args);
    } else if (command == "movie") {
      client.commands.get(command).execute(message, args);
    } else if (command == "poll") {
      client.commands.get(command).execute(client, message, args);
    } else if (command == "help") {
      client.commands.get(command).execute(client, message, args);
    } else if (command == "annoy") {
      client.commands.get(command).execute(client, message, args);
    } else if (command == "kick") {
      client.commands.get(command).execute(client, message, args);
    }
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});
//BOT ON MESSAGE

client.login(process.env.TOKEN);