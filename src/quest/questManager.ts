import Quest from "./Quest";
import { TextChannel, Message } from "discord.js";
import { QuestSpeed, mapQuestSpeedToModifier } from "../utils/QuestSpeed";
import Player from "../player/Player";

const questMap = new Map<string, Quest>();

export const isQuestActive = (guildId: string) => questMap.has(guildId);
export const getQuestCooldown = (guildId: string) => questMap.get(guildId).getCooldown();
export const isQuestJoinable = (guildId: string) => questMap.get(guildId).getJoinable();

export const isPlayerInQuest = (msg: Message) => {
  const _id = `${msg.guild.id}_${msg.author.id}`;
  return questMap.get(msg.guild.id).getPlayers().has(_id);
}

export const addPlayerToQuest = (msg: Message) => {
  const _id = `${msg.guild.id}_${msg.author.id}`;
  const newPlayer = new Player(_id, msg.author.username);
  questMap.get(msg.guild.id).addPlayer(newPlayer);
}

export const startQuest = async(guildId: string, channel: TextChannel, questSpeed: QuestSpeed) => {
  const newQuest = new Quest(channel, questSpeed);
  questMap.set(guildId, newQuest);
  try {
    await new Promise(resolve => setTimeout(resolve, 15000));
    console.log("Mock Quest Ended");
  } catch (e) {
    console.log(e);
  } finally {
    // Probably needs some future refactoring. 
    const speedModifier = mapQuestSpeedToModifier[newQuest.getQuestSpeed()];
    newQuest.setCooldown(120000 * speedModifier);
    await new Promise(resolve => setTimeout(resolve, (120000 * speedModifier)));
    questMap.delete(guildId);
  }
}
