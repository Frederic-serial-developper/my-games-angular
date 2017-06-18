import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

import { CollectionStatistics } from '../model/collectionStatistics';
import { UserMetadata } from '../model/userMetadata';

import { ToasterService } from 'angular2-toaster';
import { CollectionStatisticsService } from './games-statistics.service';

import { OnlineMenuParameters } from '../online-menu/onlineMenuParameters';

import { AuthService } from '../auth-service';

@Component({
  selector: 'app-games-statistics',
  templateUrl: './games-statistics.component.html'
})
export class GamesStatisticsComponent implements OnInit {
  stats: CollectionStatistics;
  bggUser: string;
  loading: boolean;

  constructor(public auth: AuthService, private statsService: CollectionStatisticsService, private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.auth.getUserMetadata().subscribe(
      metadata => this.initializeScreen(metadata),
      error => this.handleError());
  }

  initializeScreen(metadata: UserMetadata): void {
    this.bggUser = metadata.bggLogin;
    const parameters = new OnlineMenuParameters();
    parameters.service = environment.boardGameServiceUrl;
    parameters.includeExpansion = environment.defaultIncludeExpansion;
    parameters.includePreviouslyOwned = environment.defaultIncludePreviouslyOwned;

    this.reload(parameters);
  }

  onReceiveData(receivedStats: CollectionStatistics) {
    this.stats = receivedStats;
    this.loading = false;
  }

  reload(parameter: OnlineMenuParameters): void {
    this.loading = true;
    if (parameter.service === 'local') {
      this.statsService.getCollectionStatisticsFromFile().subscribe(receivedStats => this.onReceiveData(receivedStats));
    } else {
      this.statsService.getCollectionStatistics( //
        this.bggUser, //
        parameter.service, //
        parameter.includeExpansion, //
        parameter.includePreviouslyOwned) //
        .subscribe(
        receivedStats => this.onReceiveData(receivedStats),
        error => this.handleError());
    }
  }

  handleError(): void {
    this.loading = false;
    this.toasterService.pop('error', 'Error occurs', 'Cannot display library, an error occurs');
  }
}
