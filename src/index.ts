import { Client } from "discord.js";

const client = new Client();
client.once('ready', () => {
  console.log(`Bot Connected to Discord as ${client.user.tag}`);
})

try {
  client.login(process.env.DISCORD_TOKEN);
} catch (e) {
  console.log(e);
}