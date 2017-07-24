import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'PlayerCountPipe'
})
export class PlayerCountPipe implements PipeTransform {

  transform(value, count: number) {
    return value.filter(game => {
      return game.minPlayers <= count && count <= game.maxPlayers;
    });
  }
}
