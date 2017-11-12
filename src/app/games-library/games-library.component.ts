import { Component, OnInit, ViewChildren } from '@angular/core';

import { environment } from '../../environments/environment';

import { Game } from '../model/game';
import { UserMetadata } from '../model/userMetadata';

import { ServiceParameters } from '../model/serviceParameters';

import { GameLibraryService } from './games-library.service';
import { ToasterService } from 'angular2-toaster';

import { GamesService } from 'app/games-library/games.service';
import { UserService } from 'app/user.service';
import { User } from 'app/model/user';

@Component({
  selector: 'app-games-library',
  templateUrl: './games-library.component.html'
})
export class GamesLibraryComponent implements OnInit {
  private displayedGames: Game[];
  private receivedGames: Game[];
  private displayedGamesCount: number;

  loading: boolean;

  currentUser: User;

  private ratingOrderAsc: boolean;
  private nameOrderAsc: boolean;
  private playsCountOrderAsc: boolean;
  private playsDateOrderAsc: boolean;
  private includeExpansion: boolean;
  private includePreviouslyOwned: boolean;
  private playerCountFilter: number;
  private gameName: string;

  private selectedGame: Game;

  constructor(private userService: UserService,
    private gameLibrayService: GameLibraryService,
    private gameService: GamesService,
    private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.userChangeEvent.subscribe(selectedUser => this.initializeScreen(selectedUser));
    this.initializeScreen(this.userService.getCurrentUser());
  }

  initializeScreen(user: User): void {
    this.ratingOrderAsc = false;
    this.nameOrderAsc = true;
    this.playsCountOrderAsc = true;
    this.playsDateOrderAsc = true;
    this.playerCountFilter = 4;
    this.currentUser = user;

    const parameters = new ServiceParameters();
    parameters.service = environment.boardGameServiceUrl;
    this.includeExpansion = false;
    this.includePreviouslyOwned = false;
    parameters.includeExpansion = environment.defaultIncludeExpansion;
    parameters.includePreviouslyOwned = environment.defaultIncludePreviouslyOwned;
    this.loadStats(parameters);
  }


  loadStats(parameter: ServiceParameters): void {
    if (this.currentUser) {
      this.loading = true;
      if (parameter.service === 'local') {
        this.gameLibrayService.getGamesFromFile().subscribe(receivedGames => this.onReceiveData(receivedGames));
      } else {
        this.gameLibrayService.getGames( //
          this.currentUser.bgglogin, //
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
