import { TextChannel } from "discord.js";
import { QuestSpeed } from "../utils/QuestSpeed";

export default class Quest {
  private cooldown: number;
  private channel: TextChannel;
  private questSpeed: QuestSpeed;

  constructor(channel: TextChannel, questSpeed: QuestSpeed) {
    this.channel = channel;
    this.questSpeed = questSpeed;
  }

  getCooldown = () => {
    if (this.cooldown < Date.now()) return 0;
    return (this.cooldown - Date.now());
  };

  getQuestSpeed = () => this.questSpeed;

  setCooldown = (cooldown: number) => this.cooldown = Date.now() + cooldown;
}