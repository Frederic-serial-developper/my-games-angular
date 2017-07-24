import { Pipe, PipeTransform } from '@angular/core';

import { Game } from '../model/game';

@Pipe({
  name: 'SortByNamePipe'
})
export class SortByNamePipe implements PipeTransform {

  transform(games: [Game], order: number) {
    return games.sort((g1, g2) => (g2.name.localeCompare(g1.name)) * order);
  }
}
