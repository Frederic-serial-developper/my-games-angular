import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { GameFullDetailComponent } from './game-full-detail.component';

import { Game } from '../model/game';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html'
})

export class GameDetailComponent {
  @Input() game: Game;

  @Output() hideDetailsEventEmitter = new EventEmitter();

  constructor(public dialog: MdDialog) { }

  openFullDetails(): void {
     const dialogRef: MdDialogRef<GameFullDetailComponent> = this.dialog.open(GameFullDetailComponent);
     dialogRef.componentInstance.game = this.game;
  }

  hideDetails(): void {
    this.hideDetailsEventEmitter.emit();
  }
}
