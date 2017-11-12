import { Component, Input, OnInit } from '@angular/core';

import { CollectionStatistics } from '../model/collectionStatistics';
import { GamesStatisticsComponent } from 'app/games-statistics/games-statistics.component';

@Component({
  selector: 'app-games-statistics-ranking',
  templateUrl: './games-statistics-ranking.component.html'
})
export class GamesStatisticsRankingComponent implements OnInit {
  @Input() private stats: CollectionStatistics;


  // ng2-charts
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10'];
  barChartType = 'bar';
  barChartLegend = true;

  barChartData: any[];

  constructor(private statComponent: GamesStatisticsComponent) { }

  ngOnInit(): void {
    this.statComponent.statChangeEvent.subscribe(stat => this.loadData(stat));
    this.loadData(this.stats);
  }

  loadData(values: CollectionStatistics): void {

    this.barChartData = [{
      data: [
        values.gamesByRatingLevel.LEVEL_0,
        values.gamesByRatingLevel.LEVEL_1,
        values.gamesByRatingLevel.LEVEL_2,
        values.gamesByRatingLevel.LEVEL_3,
        values.gamesByRatingLevel.LEVEL_4,
        values.gamesByRatingLevel.LEVEL_5,
        values.gamesByRatingLevel.LEVEL_6,
        values.gamesByRatingLevel.LEVEL_7,
        values.gamesByRatingLevel.LEVEL_8,
        values.gamesByRatingLevel.LEVEL_9], label: 'Game count by ranking'
    }];
  }
}



