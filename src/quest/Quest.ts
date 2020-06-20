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

  getCooldown = () => this.cooldown;
}