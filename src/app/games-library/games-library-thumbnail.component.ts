import { Component, Input, OnInit } from '@angular/core';

import { Game } from '../model/game';

@Component({
  selector: 'app-games-library-thumbnail',
  templateUrl: './games-library-thumbnail.component.html'
})
export class GamesLibraryThumbnailComponent implements OnInit {
  @Input() private game: Game;

  displayDetails: boolean;

   ngOnInit(): void {
    this.displayDetails = false;
  }

  onClickImage(): void {
    this.displayDetails = !this.displayDetails;
  }
}
