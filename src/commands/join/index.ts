import { Message, TextChannel } from "discord.js";
import { isQuestActive, isQuestJoinable, isPlayerInQuest, addPlayerToQuest } from "../../quest/questManager";

export default function handleJoin(msg: Message) {
  if (!(msg.channel instanceof TextChannel)) return msg.reply(`You can only join a Quest from a TextChannel.`);
  if (!isQuestActive(msg.guild.id)) return msg.reply('No Quest is currently running for this Guild.');
  if (!isQuestJoinable(msg.guild.id)) return msg.reply(`This Quest is currently not accepting players.`);
  if (!isPlayerInQuest(msg)) return msg.reply(`You are already part of this Quest!`);
  addPlayerToQuest(msg);
}