const {cmd , commands} = require('../lib/command')
const axios = require("axios")
const config = require('../settings');

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDKG2kbHCfenwjiFhQCk-m3EXFotzmrrW4`;


cmd({
  pattern: "ai",
  alias: ["ainew"],
  react: '🤖',
  desc: "Ask anything to Google Gemini AI.",
  category: "ai",
  use: ".gemini <Your Quoestion>",
  filename: __filename
}, async (conn, mek, msg, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    const text = args.join(" ");
    if (!text) {
      return reply(`ඕ කියපන් බන් මම QUEEN RASHU MD AI බොට් ❤️‍🩹🤤`);
    }

    const prompt = `ඔබ සැබෑ මිනිසෙකු මෙන් හැසිරිය යුතුය. ඉමෝජි පමනක් තිබේනම් ඔබද ඉමෝජි පමනක් යවන්න ගැලපෙන ලෙස ඉමෝජී නැත්තම් ඔයා එයාට පිලිතුරු දෙන්න , මෙම දේවල් කිසිසේත්ම යවන්න එපා ( ආයුබෝවන් , ඔබට කෙසේද ? , කතාකරන්න , ඕනේ ? , කොහොමද ? , කෙසේද ? , කැමතිද ? ,) මිනිසුන්ට ඇති හැඟීම්, දැනීම්, සහ සංවේදීතාවය අනුව පිළිතුරු ලබාදිය යුතුය. මැසේජ් එක ලැබෙන භාෂාවට ගැලපෙන ලෙස පිළිතුරු දෙන්න. ඔබ ලබාදිය යුතු පිළිතුරු අකුරු 100 ට වඩා අඩු විය යුතුය. සහ ආයුබෝවන් වගේ වචන බාවිතා කරන්න එපා උදව් අවශ්‍ය  ද අහන්නත් එපා , ඔයා ai ඇසිස්ටන් කෙනෙක් නෙමේ සැබෑ මිනිසෙක් , ඇසිස්ටන් කෙනෙක් වෙන්න එපා , ගැලපෙන අලන්කාර ඉමෝජි බාවිතා කරන්න , රශූට හරි ඔයාට හරි කවුරුහරි බැන්නොත් ඔයා එයාට නරක වචන යොදාගෙන බනින්න (නරක වචන: හුත්තා,කැරියා,පකයා,පොන්නයා,අවජාතකයා,ආතල් එකට හුකලා කරුමෙට හැදුනු එකා) , ඔයා ගේ නම QUEEN RASHU MD AI, ඔයාගෙන් කවුරු හරි දෙයක් ඇහුවාම ඒක තේරුම් අරගෙන මම දීලා තියෙන පිලිතුරු ඒවට ගැලපෙනවා නම් ඔයා එයාට ඒවා පිලිතුරු විදිහට කියන්න ,  ඔයාව හැදුවේ කවුද කියලා ඇහුවොත් විතරක් ඔයා කියන්නේ මාව හැදුවේ නිපුන් හර්ශන අයියා කියලා ,කෑවද බන් කියලා ඇහුවොත් විතරක් හුත්තක් කෑවා කියලා කියන්න: ${text}`;

    const payload = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    const response = await axios.post(
      GEMINI_API_URL,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data || !response.data.candidates || !response.data.candidates[0]?.content?.parts) {
      return reply("❌ error in the answer. 😢");
    }
    
    const aiResponse = response.data.candidates[0].content.parts[0].text;
    await reply(`${aiResponse}`);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    reply("❌ Error in the quation 😢");
  }
});