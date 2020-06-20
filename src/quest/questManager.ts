import Quest from "./Quest";
import { TextChannel } from "discord.js";
import { QuestSpeed } from "../utils/QuestSpeed";

const questMap = new Map<string, Quest>();

export const isQuestActive = (guildId: string) => questMap.has(guildId);
export const getQuestCooldown = (guildId: string) => questMap.get(guildId).getCooldown();

export const startQuest = async(guildId: string, channel: TextChannel, questSpeed: QuestSpeed) => {
  const newQuest = new Quest(channel, questSpeed);
  questMap.set(guildId, newQuest);
}
