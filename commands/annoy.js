module.exports = {
  name: "annoy",
  description: "annoys server members",
  execute(client, message, args) {
    if (message.member.highestRole) {
      try {
        let channels = client.channels;
        for (let c of channels) {
          let channelType = c[1].type;
          if (channelType === "text") {
            let channelId = c[0];
            console.log(channelId);
            let messageChannel = client.channels.get(channelId);
            if (!args) return;
            messageChannel.send(args);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      message.channel.send("you don't have permission to use this command");
    }
  }
};
