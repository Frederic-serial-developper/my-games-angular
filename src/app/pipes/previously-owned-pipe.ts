import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'PreviouslyOwnedPipe'
})
export class PreviouslyOwnedPipe implements PipeTransform {

  transform(value, previouslyOwned: boolean) {
    return value.filter(game => {
      if (previouslyOwned === true) {
        return true;
      }
      return game.status === 'OWNED';
    });
  }
}
