import { Component, OnInit, ViewChildren } from '@angular/core';

import { environment } from '../../environments/environment';

import { Game } from '../model/game';
import { UserMetadata } from '../model/userMetadata';

import { OnlineMenuParameters } from '../online-menu/onlineMenuParameters';

import { GameLibraryService } from './games-library.service';
import { ToasterService } from 'angular2-toaster';

import { AuthService } from '../auth-service';

@Component({
  selector: 'app-games-library',
  templateUrl: './games-library.component.html'
})
export class GamesLibraryComponent implements OnInit {
  private displayedGames: Game[];
  private displayedGamesCount: number;

  loading: boolean;

  bggUser: string;

  private ratingOrderAsc: number;
  private nameOrderAsc: number;
  private playsOrderAsc: number;
  private includeExpansion: boolean;
  private includePreviouslyOwned: boolean;
  private playerCountFilter: number;

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
    this.playsOrderAsc = 1;
    this.playerCountFilter = 4;
    this.displayedGamesCount = 0;
    this.bggUser = metadata.bggLogin;

    const parameters = new OnlineMenuParameters();
    parameters.service = environment.boardGameServiceUrl;
    this.includeExpansion = false;
    this.includePreviouslyOwned = false;
    parameters.includeExpansion = environment.defaultIncludeExpansion;
    parameters.includePreviouslyOwned = environment.defaultIncludePreviouslyOwned;
    this.reload(parameters);
  }

  reload(parameter: OnlineMenuParameters): void {
    if (this.bggUser) {
      this.loading = true;
      if (parameter.service === 'local') {
        this.gameLibrayService.getGamesFromFile().subscribe(receivedGames => this.onReceiveData(receivedGames));
      } else {
        this.gameLibrayService.getGames( //
          this.bggUser, //
          parameter.service, //
          parameter.includeExpansion, //
          parameter.includePreviouslyOwned) //
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

  sortByPlays(): void {
    this.playsOrderAsc = this.playsOrderAsc * -1;
  }

  computeDisplayedGamesCount(): void {
    this.displayedGamesCount = 0;
    if (this.displayedGames) {
      for (const game of this.displayedGames) {
        const shouldIncludeExpansion = this.includeExpansion === true || game.data.type === 'GAME';
        const shouldIncludePreviouslyOwned = this.includePreviouslyOwned === true || game.status === 'OWNED';
        if (shouldIncludeExpansion && shouldIncludePreviouslyOwned) {
          this.displayedGamesCount++;
        }
      }
    }
  }

  onSliderPlayerCountEvent(event: any): void {
    this.playerCountFilter = event.value;
  }

}
