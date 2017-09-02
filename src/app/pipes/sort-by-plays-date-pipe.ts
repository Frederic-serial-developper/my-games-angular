import { Pipe, PipeTransform } from '@angular/core';

import { Game } from '../model/game';

@Pipe({
  name: 'SortByPlaysDatePipe'
})
export class SortByPlaysDatePipe implements PipeTransform {

  transform(games: [Game], order: number) {
    console.log(games);
    return games.sort((g1: Game, g2: Game) => (
      (this.getLastPlay(g2).localeCompare(this.getLastPlay(g1)))
      * order));
  }

  public getLastPlay(game: Game): string {
    let lastPlayDate: Date = null;
    if (game && game.plays) {
      game.plays.forEach(play => {
        if (lastPlayDate === null || lastPlayDate < play.date) {
          lastPlayDate = play.date;
        }
      });
    }
    if (lastPlayDate === null) {
      return '';
    }
    return lastPlayDate + '';
  }

}
