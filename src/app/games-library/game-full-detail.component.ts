import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Game } from '../model/game';

@Component({
  selector: 'app-game-full-detail',
  templateUrl: './game-full-detail.component.html'
})

export class GameFullDetailComponent {
  @Input() game: Game;

  constructor(public dialogRef: MatDialogRef<GameFullDetailComponent>) { }

  close(): void {
    this.dialogRef.close();

  }
}
