import { Component, Input, OnInit } from '@angular/core';

import { CollectionStatistics } from '../model/collectionStatistics';

@Component({
  selector: 'games-statistics-ranking',
  templateUrl: './games-statistics-ranking.component.html'
})
export class GamesStatisticsRankingComponent implements OnInit {
  @Input() private stats: CollectionStatistics;


  // ng2-charts
  private barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  private barChartLabels:string[] = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10'];
  private barChartType:string = 'bar';
  private barChartLegend:boolean = true;

  private barChartData:any[];

  ngOnInit(): void {
    this.barChartData = [{data: [
      this.stats.gamesByRatingLevel.LEVEL_0, 
      this.stats.gamesByRatingLevel.LEVEL_1, 
      this.stats.gamesByRatingLevel.LEVEL_2,
      this.stats.gamesByRatingLevel.LEVEL_3,
      this.stats.gamesByRatingLevel.LEVEL_4,
      this.stats.gamesByRatingLevel.LEVEL_5,
      this.stats.gamesByRatingLevel.LEVEL_6,
      this.stats.gamesByRatingLevel.LEVEL_7,
      this.stats.gamesByRatingLevel.LEVEL_8,
      this.stats.gamesByRatingLevel.LEVEL_9], label: 'Game count by ranking'}];
  }
}



