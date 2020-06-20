import { Message, TextChannel } from "discord.js";
import { QuestSpeed } from "../../utils/QuestSpeed";
import { isQuestActive, getQuestCooldown, startQuest } from "../../quest/questManager";

interface StringToQuestSpeed {
  [key: string]: QuestSpeed
}

const mapStringToQuestSpeed: StringToQuestSpeed = {
  'fast': QuestSpeed.FAST,
  'slow': QuestSpeed.SLOW
}

export default async function handleQuestStart(msg: Message, speed: string) {
  if (!(msg.channel instanceof TextChannel)) return msg.reply(`A Quest can only be started in a Guild TextChannel.`);
  // Map passed speed to Enum Value. If speed isn't specified, assign as Normal. If speed is invalid, return text.
  const questSpeed = speed ? mapStringToQuestSpeed[speed] : QuestSpeed.NORMAL;
  if (typeof questSpeed === 'undefined') return msg.channel.send(`Invalid speed specified: ${speed}`);

  const guildId = msg.guild.id;

  if (isQuestActive(guildId)) {
    const questCooldown = getQuestCooldown(guildId);
    if (questCooldown) {
      // TODO Cleanup to use Minutes/seconds.
      return msg.channel.send(`Quests are currently on cooldown. Remaining time - ${Math.round(questCooldown / 1000)} seconds`);
    } else {
      return msg.channel.send(`A Quest is already running for this server.`);
    }
  }

  startQuest(guildId, msg.channel, questSpeed);
}