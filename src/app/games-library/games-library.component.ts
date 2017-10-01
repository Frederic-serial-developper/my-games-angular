import { Component, OnInit, ViewChildren } from '@angular/core';

import { environment } from '../../environments/environment';

import { Game } from '../model/game';
import { UserMetadata } from '../model/userMetadata';

import { OnlineMenuParameters } from '../online-menu/onlineMenuParameters';

import { GameLibraryService } from './games-library.service';
import { ToasterService } from 'angular2-toaster';

import { AuthService } from '../auth-service';
import { GamesService } from 'app/games-library/games.service';

@Component({
  selector: 'app-games-library',
  templateUrl: './games-library.component.html'
})
export class GamesLibraryComponent implements OnInit {
  private displayedGames: Game[];
  private receivedGames: Game[];
  private displayedGamesCount: number;
  
  loading: boolean;

  bggUser: string;

  private ratingOrderAsc: boolean;
  private nameOrderAsc: boolean;
  private playsCountOrderAsc: boolean;
  private playsDateOrderAsc: boolean;
  private includeExpansion: boolean;
  private includePreviouslyOwned: boolean;
  private playerCountFilter: number;
  private gameName: string;

  private selectedGame: Game;

  constructor(public auth: AuthService,
    private gameLibrayService: GameLibraryService,
    private gameService: GamesService,
    private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.auth.getUserMetadata().subscribe(
      metadata => this.initializeScreen(metadata),
      error => this.handleError());
  }

  initializeScreen(metadata: UserMetadata): void {
    this.ratingOrderAsc = false;
    this.nameOrderAsc = true;
    this.playsCountOrderAsc = true;
    this.playsDateOrderAsc = true;
    this.playerCountFilter = 4;
    this.bggUser = metadata.bggLogin;

    this.initializeGrid();

    const parameters = new OnlineMenuParameters();
    parameters.service = environment.boardGameServiceUrl;
    this.includeExpansion = false;
    this.includePreviouslyOwned = false;
    parameters.includeExpansion = environment.defaultIncludeExpansion;
    parameters.includePreviouslyOwned = environment.defaultIncludePreviouslyOwned;
    this.reload(parameters);
  }

  private initializeGrid(): void {
    
  }

  private setGridData(): void {
    
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
    this.receivedGames = receivedGames;
    this.filterGames();
    this.displayedGames = this.gameService.sortByName(this.displayedGames, this.nameOrderAsc);
    this.setGridData();
    this.loading = false;
  }

  onSelect(game: Game): void {
    this.selectedGame = game;
  }

  filterGames(): void {
    this.displayedGames = this.gameService.filterGamesWithName(
      this.receivedGames,
      this.gameName,
      this.includeExpansion,
      this.includePreviouslyOwned,
      this.playerCountFilter);
    this.displayedGames = this.gameService.sortByName(this.displayedGames, this.nameOrderAsc);
    this.setGridData();
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



  onSliderPlayerCountEvent(event: any): void {
    this.playerCountFilter = event.value;
    this.filterGames();
  }

}
