export default class Player {
  private _id: string;
  private playerName: string;
  
  constructor(_id: string, playerName: string) {
    this._id = _id;
    this.playerName = playerName;
  }

  get_Id = () => this._id;
  getPlayerName = () => this.playerName;

}