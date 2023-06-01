import { Client, AttachmentBuilder, IntentsBitField } from 'discord.js';
import 'dotenv/config'
import fetch from 'node-fetch';
import fs from 'fs';
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
let configData;

client.once('ready', (c) => {
    fs.readFile('./config.json', 'utf8',(err,data) => {
        if(err){
            console.error('Error reading config.json')
            return;
        }

        try {
            configData = JSON.parse(data);
            // Use the imported JSON data here
            console.log('🤖 ' + c.user.tag + ' is online!✅')
            console.log(configData)
          } catch (err) {
            console.error('Error parsing JSON:', err);
          }
        });
    })

client.on('messageCreate', async message => {
    if (message.content.toLowerCase().substring(0,4) === configData.startKeyword && message.reference) {
        const targetChannelId = configData.targetChannel
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

// Function to get the highest role of a user
function getHighestRole(message) {
    const user = message.author
    const member = message.guild.member(user);
    const roles = member.roles.cache;
    
    let highestRole = null;
    roles.forEach(role => {
      if (!highestRole || role.position > highestRole.position) {
        highestRole = role;
      }
    });
    console.log(highestRole.name)
    return highestRole.name;
  }

// Function to check if a user has the "Admin" or "Owner" role
// Currently not implemented
function checkRole(user) {
    const adminRoleName = 'Admin';
    const ownerRoleName = 'Owner';
  
    // Check if the user has either the "Admin" or "Owner" role
    console.log(user.roles)
    return user.roles.cache.some(role =>
      role.name === adminRoleName || role.name === ownerRoleName
    );
  }

client.login(process.env.TOKEN);