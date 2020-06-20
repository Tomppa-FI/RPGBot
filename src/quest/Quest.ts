import { TextChannel } from "discord.js";
import { QuestSpeed } from "../utils/QuestSpeed";
import Player from "../player/Player";

export default class Quest {
  private cooldown: number;
  private channel: TextChannel;
  private questSpeed: QuestSpeed;
  private joinable: boolean;
  private players: Map<string, Player>;

  constructor(channel: TextChannel, questSpeed: QuestSpeed) {
    this.channel = channel;
    this.questSpeed = questSpeed;
    this.joinable = false;
    this.cooldown = 0;
    this.players = new Map();
  }

  addPlayer = (newPlayer: Player) => {
    this.players.set(newPlayer.get_Id(), newPlayer);
  }

  getPlayers = () => this.players;

  getJoinable = () => this.joinable;

  getCooldown = () => {
    if (this.cooldown < Date.now()) return 0;
    return (this.cooldown - Date.now());
  };

  getQuestSpeed = () => this.questSpeed;

  setCooldown = (cooldown: number) => this.cooldown = Date.now() + cooldown;
}