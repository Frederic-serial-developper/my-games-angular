import { Component, Input, OnInit } from '@angular/core';

import { CollectionStatistics } from '../model/collectionStatistics';

@Component({
  selector: 'app-games-statistics-plays',
  templateUrl: './games-statistics-plays.component.html'
})
export class GamesStatisticsPlaysComponent implements OnInit {
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
      const stat = this.stats.playsByYear[year];
      if (stat != null) {
        this.barChartLabels.push(year.toString());
        data.push(stat);
      }
    }

    this.barChartData = [{ data: data, label: 'Plays by year' }];
  }
}
