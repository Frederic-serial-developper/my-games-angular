import { Component, Input, OnInit } from '@angular/core';

import { Game } from '../model/game';

@Component({
  selector: 'app-games-library-thumbnail',
  templateUrl: './games-library-thumbnail.component.html'
})
export class GamesLibraryThumbnailComponent implements OnInit {
  @Input() private game: Game;

  displayDetailsFlag: boolean;

  ngOnInit(): void {
    this.displayDetailsFlag = false;
  }

  displayDetails(): void {
    this.displayDetailsFlag = true;
  }

  hideDetails(): void {
    this.displayDetailsFlag = false;
  }
}
