import { Component, Input, OnInit } from '@angular/core';

import { CollectionStatistics } from '../model/collectionStatistics';

@Component({
  selector: 'games-statistics-year',
  templateUrl: './games-statistics-year.component.html'
})
export class GamesStatisticsYearComponent implements OnInit {
  @Input() private stats: CollectionStatistics;


  // ng2-charts
  barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels:string[] = [];
  barChartType:string = 'bar';
  barChartLegend:boolean = true;

  barChartData:any[];

  ngOnInit(): void {
    let data:any[] = [];
    let currentYear = new Date().getFullYear();
    for (let year=1990; year <= currentYear; year++) {
      this.barChartLabels.push(year.toString());
      data.push(this.stats.gamesByYear[year]);
    }

    this.barChartData = [{data: data, label: 'Game count by year'}];
  }
}