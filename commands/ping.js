module.exports = {
    name: "ping",
    description: 'pingg!',
    execute(message, args) {
        message.channel.send('pong')
    },
}