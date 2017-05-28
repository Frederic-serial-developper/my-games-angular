import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

import { Game } from '../model/game';
import { OnlineMenuParameters } from '../online-menu/onlineMenuParameters';

import { GameLibraryService } from './games-library.service';

@Component({
  selector: 'app-games-library',
  templateUrl: './games-library.component.html'
})
export class GamesLibraryComponent implements OnInit {
  private games: Game[];
  private displayedGames: Game[];

  loading: boolean;

  private ratingOrderAsc: number;
  private nameOrderAsc: number;
  private playsOrderAsc: number;

  private defaultPlayerCountFilter: number;

  private selectedGame: Game;

  constructor(private gameLibrayService: GameLibraryService) {
  }

  ngOnInit(): void {
    this.loading = false;
    this.ratingOrderAsc = 1;
    this.nameOrderAsc = -1;
    this.playsOrderAsc = 1;
    this.defaultPlayerCountFilter = 4;

    const parameters = new OnlineMenuParameters();
    parameters.service = environment.boardGameServiceUrl;
    parameters.bggUser = environment.defaultBggUser;
    parameters.includeExpansion = environment.defaultIncludeExpansion;
    parameters.includePreviouslyOwned = environment.defaultIncludePreviouslyOwned;
    this.reload(parameters);
  }

    reload(parameter: OnlineMenuParameters): void {
    this.loading = true;
    if (parameter.service === 'local') {
      this.gameLibrayService.getGamesFromFile().subscribe(receivedGames => this.onReceiveData(receivedGames));
    } else {
      this.gameLibrayService.getGames( //
        parameter.bggUser, //
        parameter.service, //
        parameter.includeExpansion, //
        parameter.includePreviouslyOwned) //
        .subscribe(receivedGames => this.onReceiveData(receivedGames));
    }
  }

  onReceiveData(receivedGames: Game[]) {
    this.games = receivedGames;
    this.games.sort((g1, g2) => (g1.name.localeCompare(g2.name)));
    this.filterByPlayersCount(this.defaultPlayerCountFilter);
    this.loading = false;
  }

  onSelect(game: Game): void {
    this.selectedGame = game;
  }

  /*
  * sort the game list by name. Revert order each time it is called. On first call, games will be asc sorted.
  */
  sortByName(): void {
    this.games.sort((g1, g2) => (g1.name.localeCompare(g2.name)) * this.nameOrderAsc);
    this.displayedGames.sort((g1, g2) => (g1.name.localeCompare(g2.name)) * this.nameOrderAsc);
    this.nameOrderAsc = this.nameOrderAsc * -1;
  }

  /*
  * sort the game list by rate. Revert order each time it is called. On first call, games will be desc sorted.
  */
  sortByRating(): void {
    this.games.sort((g1, g2) => (g2.rating - g1.rating) * this.ratingOrderAsc);
    this.displayedGames.sort((g1, g2) => (g2.rating - g1.rating) * this.ratingOrderAsc);
    this.ratingOrderAsc = this.ratingOrderAsc * -1;
  }

  /*
  * sort the game list by plays. Revert order each time it is called. On first call, games will be desc sorted.
  */
  sortByPlays(): void {
    this.games.sort((g1, g2) => (
      ((g2.playsCount === undefined ? 0 : g2.playsCount) - (g1.playsCount === undefined ? 0 : g1.playsCount)) * this.playsOrderAsc));
    this.displayedGames.sort((g1, g2) => (
      ((g2.playsCount === undefined ? 0 : g2.playsCount) - (g1.playsCount === undefined ? 0 : g1.playsCount)) * this.playsOrderAsc));
    this.playsOrderAsc = this.playsOrderAsc * -1;
  }



  onSliderPlayerCountEvent(event: any): void {
    this.filterByPlayersCount(event.value);
  }

  filterByPlayersCount(count: number): void {
    this.displayedGames = this.games.filter(game => game.minPlayers <= count && count <= game.maxPlayers);
  }
}
