module.exports = async (client, voiceuserobject) => {
    // when channel is "null" the user left the voicechannel
    client.eventmanager('voiceactivity', voiceuserobject)

}