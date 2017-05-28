import { Component, Input } from '@angular/core';

import { CollectionStatistics } from '../model/collectionStatistics';

@Component({
  selector: 'app-games-statistics-global',
  templateUrl: './games-statistics-global.component.html'
})
export class GamesStatisticsGlobalComponent {

  @Input() stats: CollectionStatistics;

}
