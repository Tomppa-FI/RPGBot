import { Message } from "discord.js";
import getBotInvite from "../../utils/botInvite";

export default async function handleInvite(msg: Message) {
  // Attempt to send the invite URL as a DM. Throws error if user has DM's disabled, replies in channel instead requesting perms.
  try {
    await msg.author.send(getBotInvite(msg.client.user.id));
  } catch {
    msg.reply(`Please temporarily enable direct messages so that the Bot may PM you.`);
  }
}