const {
    RichEmbed
} = require("discord.js");

module.exports = {
    name: "poll",
    description: "Creates a poll in the server",
    execute(client, message, args) {
        let questions = args.split("|");

        const emojiElements = [
            "1️⃣",
            "2️⃣",
            "3️⃣",
            "4️⃣",
            "5️⃣",
            "6️⃣",
            "7️⃣",
            "8️⃣",
            "9️⃣",
            "🔟",
        ];
        try {
            let pollStructure = "";
            //Loop over the questions array
            for (var i = 0; i < questions.length; i++) {
                pollStructure += emojiElements[i] + " " + questions[i] + "\n \n";
            }

            //if no question is asked or the limit exceeds 
            if (questions.length < 1 || questions.length > 10) {
                message.channel.send('No question is asked or More than 10 questions are asked!')

            } else {
                //embed
                const pollEmbed = new RichEmbed()
                    .setColor('#BBADFF')
                    .setTitle("POLL")
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setDescription(pollStructure)
                    .setTimestamp();

                //reacting to the message 
                message.channel.send(pollEmbed)
                    .then(async function (m) {
                        for (var i = 0; i < questions.length; i++) {
                            await m.react(emojiElements[i]);
                        }
                    });
            }
        } catch (error) {
            console.log(error);
        }
    }
};