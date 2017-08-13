import { Component, OnInit, ViewChildren } from '@angular/core';

import { environment } from '../../environments/environment';

import { Game } from '../model/game';
import { UserMetadata } from '../model/userMetadata';

import { OnlineMenuParameters } from '../online-menu/onlineMenuParameters';

import { GameLibraryService } from './games-library.service';
import { ToasterService } from 'angular2-toaster';

import { AuthService } from '../auth-service';

@Component({
  selector: 'app-games-plays',
  templateUrl: './games-plays.component.html'
})
export class GamesPlaysComponent implements OnInit {
  private displayedGames: Game[];
  private displayedGamesCount: number;

  loading: boolean;

  bggUser: string;

  private ratingOrderAsc: number;
  private nameOrderAsc: number;
  private playsCountOrderAsc: number;
  private playsDateOrderAsc: number;


  private selectedGame: Game;
  constructor(public auth: AuthService, private gameLibrayService: GameLibraryService, private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.auth.getUserMetadata().subscribe(
      metadata => this.initializeScreen(metadata),
      error => this.handleError());
  }

  initializeScreen(metadata: UserMetadata): void {
    this.ratingOrderAsc = 1;
    this.nameOrderAsc = -1;
    this.playsCountOrderAsc = 1;
    this.playsDateOrderAsc = 1;
    this.displayedGamesCount = 0;
    this.bggUser = metadata.bggLogin;

    const parameters = new OnlineMenuParameters();
    parameters.service = environment.boardGameServiceUrl;
    parameters.includeExpansion = environment.defaultIncludeExpansion;
    parameters.includePreviouslyOwned = environment.defaultIncludePreviouslyOwned;
    this.reload(parameters);
  }

  reload(parameter: OnlineMenuParameters): void {
    if (this.bggUser) {
      this.loading = true;
      if (parameter.service === 'local') {
        this.gameLibrayService.getPlaysFromFile().subscribe(receivedGames => this.onReceiveData(receivedGames));
      } else {
        this.gameLibrayService.getPlays( //
          this.bggUser, //
          parameter.service) //
          .subscribe(
          receivedGames => this.onReceiveData(receivedGames),
          error => this.handleError());
      }
    } else {
      this.loading = false;
    }
  }

  handleError(): void {
    this.loading = false;
    this.toasterService.pop('error', 'Error occurs', 'Cannot display library, an error occurs');
  }

  onReceiveData(receivedGames: Game[]) {
    this.displayedGames = receivedGames;
    this.displayedGames.sort((g1, g2) => (g1.name.localeCompare(g2.name)));
    this.computeDisplayedGamesCount();
    this.loading = false;
  }

  onSelect(game: Game): void {
    this.selectedGame = game;
  }

  sortByName(): void {
    this.nameOrderAsc = this.nameOrderAsc * -1;
  }

  sortByRating(): void {
    this.ratingOrderAsc = this.ratingOrderAsc * -1;
  }

  sortByPlaysCount(): void {
    this.playsCountOrderAsc = this.playsCountOrderAsc * -1;
  }

  sortByPlaysDate(): void {
    this.playsDateOrderAsc = this.playsDateOrderAsc * -1;
  }

  computeDisplayedGamesCount(): void {
    this.displayedGamesCount = 0;
    if (this.displayedGames) {
      for (const game of this.displayedGames) {
        this.displayedGamesCount++;
      }
    }
  }

}
