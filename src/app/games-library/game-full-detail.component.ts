import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Game } from '../model/game';

@Component({
  selector: 'app-game-full-detail',
  templateUrl: './game-full-detail.component.html'
})

export class GameFullDetailComponent {
  @Input() game: Game;

  constructor(public dialogRef: MdDialogRef<GameFullDetailComponent>) { }

  close(): void {
    this.dialogRef.close();

  }
}
