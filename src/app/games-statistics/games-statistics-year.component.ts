import { Component, Input, OnInit } from '@angular/core';

import { CollectionStatistics } from '../model/collectionStatistics';

@Component({
  selector: 'app-games-statistics-year',
  templateUrl: './games-statistics-year.component.html'
})
export class GamesStatisticsYearComponent implements OnInit {
  @Input() private stats: CollectionStatistics;


  // ng2-charts
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = [];
  barChartType = 'bar';
  barChartLegend = true;

  barChartData: any[];

  ngOnInit(): void {
    const data: any[] = [];
    const currentYear = new Date().getFullYear();
    for (let year = 1990; year <= currentYear; year++) {
      const stat = this.stats.gamesByYear[year];
      if (stat != null) {
        this.barChartLabels.push(year.toString());
        data.push(stat);
      }
    }

    this.barChartData = [{ data: data, label: 'Game count by year' }];
  }
}
