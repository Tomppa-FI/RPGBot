import { Client } from "discord.js";
import getBotInvite from "./utils/botInvite";

const client = new Client();
client.once('ready', () => {
  console.log(
`Bot Connected to Discord as ${client.user.tag}
${getBotInvite(client.user.id)}`
  );
})

try {
  client.login(process.env.DISCORD_TOKEN);
} catch (e) {
  console.log(e);
}