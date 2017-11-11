import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

import { CollectionStatistics } from '../model/collectionStatistics';
import { UserMetadata } from '../model/userMetadata';

import { ToasterService } from 'angular2-toaster';
import { CollectionStatisticsService } from './games-statistics.service';

import { ServiceParameters } from '../model/serviceParameters';
import { UserService } from 'app/user.service';
import { User } from 'app/model/user';

@Component({
  selector: 'app-games-statistics',
  templateUrl: './games-statistics.component.html'
})
export class GamesStatisticsComponent implements OnInit {
  stats: CollectionStatistics;
  currentUser: User;
  loading: boolean;

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
    const parameters = new ServiceParameters();
    parameters.service = environment.boardGameServiceUrl;
    parameters.includeExpansion = environment.defaultIncludeExpansion;
    parameters.includePreviouslyOwned = environment.defaultIncludePreviouslyOwned;
    this.currentUser = user;

    this.reload(parameters);
  }

  onReceiveData(receivedStats: CollectionStatistics) {
    this.stats = receivedStats;
    this.loading = false;
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
