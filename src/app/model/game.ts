import { Play } from '../model/play';
import { GameData } from '../model/gameData';

export class Game {
  id: number;
  name: string;
  status: string;
  playsCount: number;
  plays: Play[];
  data: GameData;
}
