import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { environment } from '../../environments/environment';

import { Game } from '../model/game';
import { OnlineMenuParameters } from './onlineMenuParameters';

@Component({
  selector: 'app-online-menu',
  templateUrl: './online-menu.component.html'
})
export class OnlineMenuComponent implements OnInit {
  @Output() reloadAction = new EventEmitter();

  bggUser: string;
  includeExpansion: boolean;
  includePreviouslyOwned: boolean;

  ngOnInit(): void {
    this.bggUser = 'fredericdib';
    this.includeExpansion = true;
    this.includePreviouslyOwned = false;
  }

  reload(): void {
    const parameters = new OnlineMenuParameters();
    if (environment.production) {
      parameters.bggUser = this.bggUser;
      parameters.service = environment.boardGameServiceUrl;
    }
    parameters.includeExpansion = this.includeExpansion;
    parameters.includePreviouslyOwned = this.includePreviouslyOwned;
    this.reloadAction.emit(parameters);
  }
}
