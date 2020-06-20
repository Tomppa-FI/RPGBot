import { Message, TextChannel } from "discord.js";
import { isQuestActive, getQuestCooldown, startQuest } from "../../quest/questManager";
import { msToString } from "../../utils/timing";

interface StringToSpeedModifier {
  [key: string]: number
}

const mapStringToSpeedModifier: StringToSpeedModifier = {
  'fast': 1.5,
  'slow': .5
}

export default async function handleQuestStart(msg: Message, speed: string) {
  if (!(msg.channel instanceof TextChannel)) return msg.reply(`A Quest can only be started in a Guild TextChannel.`);
  // Map passed speed to Enum Value. If speed isn't specified, assign as Normal. If speed is invalid, return text.
  const speedModifier = speed ? mapStringToSpeedModifier[speed] : 1;
  if (!speedModifier) return msg.channel.send(`Invalid speed specified: ${speed}`);

  const guildId = msg.guild.id;

  if (isQuestActive(guildId)) {
    const questCooldown = getQuestCooldown(guildId);
    if (questCooldown) {
      // TODO Cleanup to use Minutes/seconds.
      return msg.channel.send(`Quests are currently on cooldown. You can begin a new Quest in ${msToString(questCooldown)}`);
    } else {
      return msg.channel.send(`A Quest is already running for this server.`);
    }
  }

  startQuest(guildId, msg.channel, speedModifier);
}