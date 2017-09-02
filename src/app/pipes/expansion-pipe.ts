import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ExpansionPipe'
})
export class ExpansionPipe implements PipeTransform {

  transform(value, expansion: boolean) {
    return value.filter(game => {
      if (expansion === true || game.data === null) {
        return true;
      }
      return game.data.type === 'GAME';
    });
  }
}
