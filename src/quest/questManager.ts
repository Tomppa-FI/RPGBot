import Quest from "./Quest";
import { TextChannel, Message } from "discord.js";
import Player from "../player/Player";
import handleBeginning from "./components/beginning";
import { QuestStartDelayMS } from "../utils/timing";
import { QuestError } from "../utils/errors";

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

export const startQuest = async(guildId: string, channel: TextChannel, speedModifier: number) => {
  const newQuest = new Quest(channel, speedModifier);
  questMap.set(guildId, newQuest);
  try {
    await handleBeginning(newQuest);
  
    // Probably needs some future refactoring. 
    const speedModifier = newQuest.getSpeedModifier();
    newQuest.setCooldown(QuestStartDelayMS(speedModifier));
    await new Promise(resolve => setTimeout(resolve, (QuestStartDelayMS(speedModifier))));
  } catch (e) {
    if (e instanceof QuestError) {
      newQuest.sendChannelMessage(e.message);
    } else {
      console.log(e);
    }
  } finally {
    questMap.delete(guildId);
  }
}
