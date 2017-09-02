import { Component, OnInit, ViewChildren } from '@angular/core';

import { environment } from '../../environments/environment';

import { Game } from '../model/game';
import { UserMetadata } from '../model/userMetadata';

import { OnlineMenuParameters } from '../online-menu/onlineMenuParameters';

import { GameLibraryService } from './games-library.service';
import { ToasterService } from 'angular2-toaster';

import { AuthService } from '../auth-service';
import { GamesService } from "app/games-library/games.service";

@Component({
  selector: 'app-games-plays',
  templateUrl: './games-plays.component.html'
})
export class GamesPlaysComponent implements OnInit {
  private receivedGames: Game[];
  private displayedGames: Game[];
  private displayedGamesCount: number;

  loading: boolean;

  bggUser: string;

  private ratingOrderAsc: number;
  private nameOrderAsc: number;
  private playsCountOrderAsc: number;
  private playsDateOrderAsc: number;

  private selectedGame: Game;

  constructor(public auth: AuthService, private gameLibrayService: GameLibraryService, private gameService: GamesService, private toasterService: ToasterService) {
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
    this.receivedGames = receivedGames;
    this.displayedGames = this.gameService.sortByName(this.receivedGames, this.nameOrderAsc);
    this.loading = false;
  }

  onSelect(game: Game): void {
    this.selectedGame = game;
  }

  sortByName(): void {
    this.nameOrderAsc = this.nameOrderAsc * -1;
    this.displayedGames = this.gameService.sortByName(this.displayedGames, this.nameOrderAsc);
  }

  sortByRating(): void {
    this.ratingOrderAsc = this.ratingOrderAsc * -1;
    this.displayedGames = this.gameService.sortByRating(this.displayedGames, this.ratingOrderAsc);
  }

  sortByPlaysCount(): void {
    this.playsCountOrderAsc = this.playsCountOrderAsc * -1;
    this.displayedGames = this.gameService.sortByPlaysCount(this.displayedGames, this.playsCountOrderAsc);
  }

  sortByPlaysDate(): void {
    this.playsDateOrderAsc = this.playsDateOrderAsc * -1;
    this.displayedGames = this.gameService.sortByPlaysDate(this.displayedGames, this.playsDateOrderAsc);
  }

}
