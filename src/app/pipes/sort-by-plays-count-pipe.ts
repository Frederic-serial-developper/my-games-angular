import { Pipe, PipeTransform } from '@angular/core';

import { Game } from '../model/game';

@Pipe({
  name: 'SortByPlaysCountPipe'
})
export class SortByPlaysCountPipe implements PipeTransform {

  transform(games: [Game], order: number) {
    return games.sort((g1, g2) => (
      ((g1.playsCount === undefined ? 0 : g1.playsCount) - (g2.playsCount === undefined ? 0 : g2.playsCount)) * order));
  }
}
