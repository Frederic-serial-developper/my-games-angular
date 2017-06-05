import { Component, Input, OnInit } from '@angular/core';

import { CollectionStatistics } from '../model/collectionStatistics';

@Component({
  selector: 'app-games-statistics-global',
  templateUrl: './games-statistics-global.component.html'
})
export class GamesStatisticsGlobalComponent implements OnInit {

  @Input() stats: CollectionStatistics;
  lastUpdate: Date;

  ngOnInit(): void {
    this.lastUpdate = new Date(this.stats.lasUpdate);
  }

}
