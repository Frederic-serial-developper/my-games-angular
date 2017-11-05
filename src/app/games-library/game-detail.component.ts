import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { GameFullDetailComponent } from './game-full-detail.component';

import { Game } from '../model/game';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html'
})

export class GameDetailComponent {
  @Input() game: Game;

  @Output() hideDetailsEventEmitter = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  openFullDetails(): void {
     const dialogRef: MatDialogRef<GameFullDetailComponent> = this.dialog.open(GameFullDetailComponent);
     dialogRef.componentInstance.game = this.game;
  }

  hideDetails(): void {
    this.hideDetailsEventEmitter.emit();
  }
}
