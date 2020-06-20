import { Client } from "discord.js";
import getBotInvite from "./utils/botInvite";
import handleInvite from "./commands/invite";

const client = new Client();

client.once('ready', () => {
  console.log(
`Bot Connected to Discord as ${client.user.tag}
${getBotInvite(client.user.id)}`
  );
})

client.on('message', msg => {
  // If MSG is sent by bot, or doesn't start with prefix, ignore the message.
  if (msg.author.bot || !msg.content.startsWith(process.env.COMMAND_PREFIX)) return;

  // Split message into command & arguments, and map to lowercase.
  const [cmd, ...rest] = msg.content.slice(process.env.COMMAND_PREFIX.length).split(" ").map(val => val.toLowerCase());
  switch (cmd) {
    case 'invite':
      return handleInvite(msg);
    default:
      return msg.reply(`Invalid Command: ${cmd}`);
  }
})

try {
  client.login(process.env.DISCORD_TOKEN);
} catch (e) {
  console.log(e);
}