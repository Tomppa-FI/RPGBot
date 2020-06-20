import { TextChannel } from "discord.js";
import Player from "../player/Player";

export default class Quest {
  private cooldown: number;
  private channel: TextChannel;
  private speedModifier: number;
  private joinable: boolean;
  private players: Map<string, Player>;

  constructor(channel: TextChannel, speedModifier: number) {
    this.channel = channel;
    this.speedModifier = speedModifier;
    this.joinable = false;
    this.cooldown = 0;
    this.players = new Map();
  }

  addPlayer = (newPlayer: Player) => {
    this.players.set(newPlayer.get_Id(), newPlayer);
  }

  getPlayers = () => this.players;

  getJoinable = () => this.joinable;

  setJoinable = (val: boolean) => {
    this.joinable = val;
  }

  getCooldown = () => {
    if (this.cooldown < Date.now()) return 0;
    return (this.cooldown - Date.now());
  };

  getSpeedModifier = () => this.speedModifier;

  setCooldown = (cooldown: number) => this.cooldown = Date.now() + cooldown;

  sendChannelMessage = (msg: string) => {
    this.channel.send(msg);
  }
}