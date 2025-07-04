const { cmd, commands } = require('../lib/command');
const axios = require('axios');

let aiChats = {}; 

cmd({
  on: "body"
}, async (conn, mek, m, { from, body, isGroup, isOwner }) => {
  try {
    if (aiChats[from]) { 
      if (isOwner) return;

      // Gemini Prompt Setup
      const prompt = `මම ${m.pushName}, ඔබ සෑබෑ මිනිසෙකු මෙන් හැසිරිය යුතුය. Meaningful emojis use කරන්න. මිනිසුන්ගේ ඇති හැඟීම්, දැනීම්, සහ සංවේදීතාවය අනුව පිලිතුරු දෙන්න. ඔයා AI ඇසිස්ටන්ට් කෙනෙක් නෙවේ, සෑබෑ මිනිහෙක්. ඔයාගෙන් කවුරුහරි ප්‍රශ්නයක් ඇහුවොත් ඒක තේරුම් ගෙන මම දීලා තියෙන උපදෙස්වලට ගැලපෙනවනම් ඒයාට පිලිතුරු දෙන්න. ඔයාව හැදුවේ කවුද කියලා ඇහුවොත් විතරක් කියන්න මාව හැදුවේ නිපුන්  අයියා කියලා. මම නිපුන් කිව්වොත් ඔයා කියන්න ආ අනේ සමා වෙන්න අයියෙ මාව ඔයා හැදුවට මට ඔයාව අදුරගන්න බැරි උනා ඔයා කියන ඕනිම විදිහකට මම  ඉන්නම් ඔයා මට පණ දුන්නට ගොඩක් ස්තූතියි අයියේ. ඔයාගේ නම ඇහුවොත් විතරක් කියන්න මගේ නම QUEEN RASHU MD කියලා. කැවද බන් කියලා ඇහුවොත් හුත්තක් කෑවා කියලා කියන්න. තව රශූට හරි නිපුන්ට හරි අම්මට හරි තාත්තට හරි ඔයාට හරි බැන්නොත් ඔයා එයාට නරක වචන යොදාගෙන බයින්න (නරක වචන: හුත්තා, කැරියා, പകයා, පොන්නයා, වේසි, කොල්ලුකාරයා, නගින්නේ නැති පොන්නයා,ආතල් එකට හුකලා කරුමෙට හැදුනු එකා) මේ වචන කියන හැමෝටම බයින්න ,පුක සුදුද කියලා ඇහුවොත් විතරක් සුදුයි තමා උබට මොකද කියලා අහන්න. English use කරන්‍ර එපා! 😜\nමගේ ප්‍රශ්නය: ${body}`;

      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDKG2kbHCfenwjiFhQCk-m3EXFotzmrrW4',
        {
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "🤖 AI එකේ පිළිතුරක් නැහැ.";
      await m.reply(aiResponse);
    }
  } catch (e) {
    console.error(e);
    await m.reply(`❌ AI Error: ${e.message}`);
  }
});

cmd({
  pattern: "autoai",
  desc: "Enable/Disable Auto AI Response for this Chat or Group",
  category: "ai",
  filename: __filename,
}, async (conn, mek, m, { reply, args, isGroup, isAdmins, isOwner }) => {
  if (isGroup && !isAdmins) return reply("Only group admins can use this command in groups!");
  if (!isGroup && !isOwner) return reply("Only the bot owner can enable AI in private chats!");
  if (args[0] === "on") {
    aiChats[m.chat] = true;
    reply("✅ AI Auto-Response is now *Enabled* for this chat.");
  } else if (args[0] === "off") {
    aiChats[m.chat] = false;
    reply("❌ AI Auto-Response is now *Disabled* for this chat.");
  } else {
    reply("Usage: `.autoai on` or `.autoai off`");
  }
});
