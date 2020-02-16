module.exports = {
  name: "ping",
  description: "ping!",
  execute(client, message, args) {
    message.channel.send("Pinging...").then(m => {
      let ping = Math.floor(m.createdTimestamp - message.createdTimestamp);
      m.edit(`Bot Latency: ${ping}ms  
API Latency: ${Math.round(client.ping)}ms`);
    });
  }
};
