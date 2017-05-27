import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Game } from '../model/game';
import { OnlineMenuParameters } from './onlineMenuParameters';

@Component({
  selector: 'online-menu',
  templateUrl: './online-menu.component.html'
})
export class OnlineMenuComponent implements OnInit {
  @Output() reloadAction = new EventEmitter();

  private online: boolean;

  private bggUser: string;
  private includeExpansion: boolean;
  private includePreviouslyOwned: boolean;
  private selectedService: string;
  private availableServices = [
    { value: 'https://my-games-services.herokuapp.com', viewValue: 'Heroku' },
    { value: 'http://localhost:8080/my-games-services', viewValue: 'Local' }
  ];

  ngOnInit(): void {
    this.online = false;
    this.bggUser = "fredericdib";
    this.includeExpansion = true;
    this.includePreviouslyOwned = false;
    this.selectedService = 'https://my-games-services.herokuapp.com';
  }

  reload(bggUser: string, service: any): void {
    let parameters = new OnlineMenuParameters();
    parameters.bggUser = bggUser;
    parameters.service = service;
    parameters.includeExpansion = this.includeExpansion;
    parameters.includePreviouslyOwned = this.includePreviouslyOwned;
    this.reloadAction.emit(parameters);
  }
}
