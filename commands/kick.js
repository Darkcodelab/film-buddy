module.exports = {
    name: 'kick',
    description: "command to kick or ban members(only if the author has permissions)",
    execute(client, message, args) {
        if (message.deletable) message.delete();

        // No args


        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ You do not have permissions to kick members. Please contact a staff member")
                .then(m => m.delete(5000));
        }

        // No bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ I do not have permissions to kick members. Please contact a staff member")
                .then(m => m.delete(5000));
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toKick) {
            return message.reply("Couldn't find that member, try again")
                .then(m => m.delete(5000));
        }

        // Can't kick urself
        if (toKick.id === message.author.id) {
            return message.reply("You can't kick yourself...")
                .then(m => m.delete(5000));
        }

        // Check if the user's kickable
        if (!toKick.kickable) {
            return message.reply("I can't kick that person due to role hierarchy, I suppose.")
                .then(m => m.delete(5000));
        }

        if (toKick.kickable) {
            try {
                toKick.kick();
                message.channel.send(`${message.author} kicked ${toKick} for${args}`)
            } catch (err) {
                console.log(err)
            }
        }


    }


};