import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { environment } from '../../environments/environment';

import { CollectionStatistics } from '../model/collectionStatistics';
import { UserMetadata } from '../model/userMetadata';

import { ToasterService } from 'angular2-toaster';
import { CollectionStatisticsService } from './games-statistics.service';

import { ServiceParameters } from '../model/serviceParameters';
import { UserService } from 'app/user.service';
import { User } from 'app/model/user';
import { CollectionByStatusStatistics } from 'app/model/CollectionByStatusStatistics';
import { StatusStatistics } from 'app/model/statusStatistics';

@Component({
  selector: 'app-games-statistics',
  templateUrl: './games-statistics.component.html'
})
export class GamesStatisticsComponent implements OnInit {
  @Output() statChangeEvent: EventEmitter<CollectionStatistics> = new EventEmitter();
  stats: CollectionStatistics;
  statsByStatus: CollectionByStatusStatistics;

  currentUser: User;
  loading: boolean;
  private includeExpansion: boolean;
  private includePreviouslyOwned: boolean;

  constructor(private userService: UserService,
    private statsService: CollectionStatisticsService,
    private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.userChangeEvent.subscribe(selectedUser => this.initializeScreen(selectedUser));
    this.initializeScreen(this.userService.getCurrentUser());
  }

  initializeScreen(user: User): void {
    this.includeExpansion = false;
    this.includePreviouslyOwned = false;
    const parameters = new ServiceParameters();
    parameters.service = environment.boardGameServiceUrl;
    parameters.includeExpansion = environment.defaultIncludeExpansion;
    parameters.includePreviouslyOwned = environment.defaultIncludePreviouslyOwned;
    this.currentUser = user;

    this.reload(parameters);
  }

  onReceiveData(receivedStats: CollectionByStatusStatistics) {
    this.statsByStatus = receivedStats;
    this.updateStats();
    this.loading = false;
  }

  updateStats(): void {
    this.stats = new CollectionStatistics();
    this.stats.lasUpdate = this.statsByStatus.lasUpdate;
    this.stats.playsByYear = this.statsByStatus.playsByYear;
    this.stats.totalPlays = this.statsByStatus.totalPlays;

    this.agregateStats(this.statsByStatus.gamesStats);

    if (this.includeExpansion) {
      this.agregateStats(this.statsByStatus.expansionsStats);
      if (this.includePreviouslyOwned) {
        this.agregateStats(this.statsByStatus.previousExpansionsStats);
        this.agregateStats(this.statsByStatus.previousGamesStats);
      }
    } else if (this.includePreviouslyOwned) {
      this.agregateStats(this.statsByStatus.previousGamesStats);
    }
    console.log(this.stats.gamesByRatingLevel);
    this.statChangeEvent.emit(this.stats);
  }

  agregateStats(statusStat: StatusStatistics): void {
    if (statusStat) {
      if (statusStat.totalSize) {
        this.stats.totalSize = this.stats.totalSize + statusStat.totalSize;
      }
      if (statusStat.gamesByRatingLevel) {
        this.agregateRatings(statusStat.gamesByRatingLevel);
      }
      if (statusStat.gamesByYear) {
        this.agregateYears(statusStat.gamesByYear);
      }
    }
  }

  agregateRatings(statToAdd: { [name: string]: number }): void {
    for (const rating in statToAdd) {
      if (rating) {
        if (!this.stats.gamesByRatingLevel[rating]) {
          this.stats.gamesByRatingLevel[rating] = 0;
        }
        this.stats.gamesByRatingLevel[rating] = this.stats.gamesByRatingLevel[rating] + statToAdd[rating];
      }
    }
  }

  agregateYears(statToAdd: { [year: number]: number }): void {
    for (const yearValue in statToAdd) {
      if (yearValue) {
        const year = Number(yearValue);
        if (!this.stats.gamesByYear[year]) {
          this.stats.gamesByYear[year] = 0;
        }
        this.stats.gamesByYear[year] = this.stats.gamesByYear[year] + statToAdd[year];
      }
    }
  }

  reload(parameter: ServiceParameters): void {
    this.loading = true;
    if (this.currentUser) {
      if (parameter.service === 'local') {
        this.statsService.getCollectionStatisticsFromFile().subscribe(receivedStats => this.onReceiveData(receivedStats));
      } else {
        this.statsService.getCollectionStatistics( //
          this.currentUser.bgglogin, //
          parameter.service, //
          parameter.includeExpansion, //
          parameter.includePreviouslyOwned) //
          .subscribe(
          receivedStats => this.onReceiveData(receivedStats),
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
}
