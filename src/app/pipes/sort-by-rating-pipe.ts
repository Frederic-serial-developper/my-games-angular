import { Pipe, PipeTransform } from '@angular/core';

import { Game } from '../model/game';

@Pipe({
  name: 'SortByRatingPipe'
})
export class SortByRatingPipe implements PipeTransform {

  transform(games: [Game], order: number) {
    return games.sort((g1, g2) => (this.getRating(g1) - this.getRating(g2)) * order);
  }

  private getRating(game: Game): number {
    return game.data == null ? 0 : game.data.rating;
  }

}
