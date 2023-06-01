import { Client, AttachmentBuilder, IntentsBitField } from 'discord.js';
import 'dotenv/config'
import fetch from 'node-fetch';
import { BotConfig } from './config.js'
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildMessageTyping,
    ],
});

const botConfig = new BotConfig()

client.once('ready', (c) => {
    console.log('🤖 ' + c.user.tag + ' is online!✅')
});

client.on('messageCreate', async message => {
    if (message.content.toLowerCase().substring(0,4) === botConfig.startKeyword && message.reference) {
      const targetChannelId = botConfig.targetChannel
      const fetchedMessage = await message.channel.messages.fetch(message.reference.messageId);
      const attachments = fetchedMessage.attachments;
      if (attachments && attachments.size > 0) {
        const attachmentUrls = attachments.map(attachment => attachment.url);
        const firstAttachmentUrl = attachmentUrls[0]

        //download the file
        const response = await fetch(firstAttachmentUrl);
        //This may need to get changed to .bufferarray - not sure how the format changes and what AttachmentBuilder expects
        const buffer = await response.buffer();
        const imageAttachment = new AttachmentBuilder(buffer,'image.png');

        await client.channels.cache.get(targetChannelId)
            .send(
                { 
                content: '**' + message.content.substring(5,message.content.length) + '**',
                files: [imageAttachment]
                });
        console.log('🎉🎉image successfully shared!🎉🎉')

    }
}
});

client.login(process.env.TOKEN);