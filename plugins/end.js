const config = require('../settings')
const { cmd, commands } = require('../lib/command')
  
cmd({
    pattern: "end",
    desc: "Kicks all non-admin members from the group.",
    react: "💨",
    category: "group",
    filename: __filename,
},           
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
      if (!isAdmins) return reply(`ONLY ADMINS CAN USE THIS CMD 🪄♻️`)
      if (!isOwner) return reply(`SORRY ADMINS YOU R NOT BOT OWNER 🪄♻️`)
      
        // Check if the command is used in a group
        if (!isGroup) return reply(`This command is only for groups.`);
        
        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply(`I need admin privileges to kick users.`);
        // Fetch all participants from the group
        const allParticipants = groupMetadata.participants;
        // Filter out the admins (including the bot)
        const nonAdminParticipants = allParticipants.filter(member => !groupAdmins.includes(member.id));
        if (nonAdminParticipants.length === 0) {
            return reply('There are no non-admin members to kick.');
        }
        // Start removing non-admin participants
        for (let participant of nonAdminParticipants) {
            await conn.groupParticipantsUpdate(m.chat, [participant.id], "remove");
  }
        // Send a confirmation message once done
        reply(`*💨 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 Successfully Kicked All Non-Admin Members From The Group.*

> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟`);
        
    } catch (e) {
        console.error('Error kicking users:', e);
        reply('An error occurred while trying to kick all members. Please try again.');
    }
});
