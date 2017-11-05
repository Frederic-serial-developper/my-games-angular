import { Component, OnInit, ViewChildren } from '@angular/core';

import { environment } from '../../environments/environment';

import { Game } from '../model/game';
import { UserMetadata } from '../model/userMetadata';

import { OnlineMenuParameters } from '../online-menu/onlineMenuParameters';

import { GameLibraryService } from './games-library.service';
import { ToasterService } from 'angular2-toaster';

import { GamesService } from 'app/games-library/games.service';
import { UserService } from 'app/user.service';

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

  private ratingOrderAsc: boolean;
  private nameOrderAsc: boolean;
  private playsCountOrderAsc: boolean;
  private playsDateOrderAsc: boolean;

  private selectedGame: Game;

  constructor(private userService: UserService,
    private gameLibrayService: GameLibraryService,
    private gameService: GamesService,
    private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.initializeScreen();
  }

  initializeScreen(): void {
    this.ratingOrderAsc = false;
    this.nameOrderAsc = true;
    this.playsCountOrderAsc = false;
    this.playsDateOrderAsc = true;
    this.bggUser = this.userService.getCurrentUser();

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
    this.displayedGames = this.gameService.sortByPlaysDate(this.receivedGames, this.nameOrderAsc);
    this.loading = false;
  }

  onSelect(game: Game): void {
    this.selectedGame = game;
  }

  sortByName(): void {
    this.nameOrderAsc = !this.nameOrderAsc;
    this.displayedGames = this.gameService.sortByName(this.displayedGames, this.nameOrderAsc);
  }

  sortByRating(): void {
    this.ratingOrderAsc = !this.ratingOrderAsc;
    this.displayedGames = this.gameService.sortByRating(this.displayedGames, this.ratingOrderAsc);
  }

  sortByPlaysCount(): void {
    this.playsCountOrderAsc = !this.playsCountOrderAsc;
    this.displayedGames = this.gameService.sortByPlaysCount(this.displayedGames, this.playsCountOrderAsc);
  }

  sortByPlaysDate(): void {
    this.playsDateOrderAsc = !this.playsDateOrderAsc;
    this.displayedGames = this.gameService.sortByPlaysDate(this.displayedGames, this.playsDateOrderAsc);
  }

}
