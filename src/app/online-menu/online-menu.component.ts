import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { environment } from '../../environments/environment';

import { Game } from '../model/game';
import { OnlineMenuParameters } from './onlineMenuParameters';
import { UserMetadata } from '../model/userMetadata';

@Component({
  selector: 'app-online-menu',
  templateUrl: './online-menu.component.html'
})
export class OnlineMenuComponent implements OnInit {
  @Output() reloadAction = new EventEmitter();

  includeExpansion: boolean;
  includePreviouslyOwned: boolean;
  loading: boolean;

  ngOnInit(): void {
    this.loading = true;
    this.includeExpansion = environment.defaultIncludeExpansion;
    this.includePreviouslyOwned = environment.defaultIncludePreviouslyOwned;
    this.loading = false;
  }

  reload(): void {
    const parameters = new OnlineMenuParameters();
    parameters.service = environment.boardGameServiceUrl;
    parameters.includeExpansion = this.includeExpansion;
    parameters.includePreviouslyOwned = this.includePreviouslyOwned;
    this.reloadAction.emit(parameters);
  }
}
