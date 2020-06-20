import Quest from "./Quest";
import { TextChannel } from "discord.js";
import { QuestSpeed, mapQuestSpeedToModifier } from "../utils/QuestSpeed";

const questMap = new Map<string, Quest>();

export const isQuestActive = (guildId: string) => questMap.has(guildId);
export const getQuestCooldown = (guildId: string) => questMap.get(guildId).getCooldown();

export const startQuest = async(guildId: string, channel: TextChannel, questSpeed: QuestSpeed) => {
  const newQuest = new Quest(channel, questSpeed);
  questMap.set(guildId, newQuest);
  try {
    await new Promise(resolve => setTimeout(resolve, 5000));
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
