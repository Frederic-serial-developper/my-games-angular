import { Pipe, PipeTransform } from '@angular/core';

import { Game } from '../model/game';

@Pipe({
  name: 'SortByRatingPipe'
})
export class SortByRatingPipe implements PipeTransform {

  transform(games: [Game], order: number) {
    return games.sort((g1, g2) => (g1.data.rating - g2.data.rating) * order);
  }
}
