import { Play } from '../model/play';
import { GameData } from '../model/gameData';

export class Game {
  id: number;
  name: string;
  status: string;
  playsCount: number;
  plays: Play[];
  data: GameData;

  public getLastPlay(): Date {
    let lastPlayDate: Date = null;
    if (this.plays) {
      this.plays.forEach(play => {
        if (lastPlayDate === null || lastPlayDate < play.date) {
          lastPlayDate = play.date;
        }
      });
    }
    return lastPlayDate;
  }
}
