import { Play } from '../model/play';

export class Game {
  id: number;
  name: string;
  description: string;
  categories: string[];
  mechanisms: string[];
  type: string;
  source: string;
  status: string;
  rating: number;
  image: string;
  playsCount: number;
  plays: Play[];
  year: number;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
}
