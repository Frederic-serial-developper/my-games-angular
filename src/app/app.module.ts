import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ng bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// material2
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdCheckboxModule, MdSliderModule, MdSelectModule,
  MdTooltipModule, MdProgressSpinnerModule, MdSlideToggleModule,
  MdToolbarModule
} from '@angular/material';
import 'hammerjs';

// flex layout
import { FlexLayoutModule } from "@angular/flex-layout";

// app
import { AppComponent } from './app.component';
// app components & services for library
import { GamesLibraryComponent } from './games-library/games-library.component';
import { GamesLibraryThumbnailComponent } from './games-library/games-library-thumbnail.component';
import { GameDetailComponent } from './games-library/game-detail.component';
import { GameLibraryService } from './games-library/games-library.service';
// app components & services for statistics
import { GamesStatisticsComponent } from './games-statistics/games-statistics.component';
import { GamesStatisticsRankingComponent } from './games-statistics/games-statistics-ranking.component';
import { GamesStatisticsYearComponent } from './games-statistics/games-statistics-year.component';
import { GamesStatisticsGlobalComponent } from './games-statistics/games-statistics-global.component';
import { CollectionStatisticsService } from './games-statistics/games-statistics.service';
// menu component
import { OnlineMenuComponent } from './online-menu/online-menu.component';

@NgModule({
  imports: [BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'library',
        component: GamesLibraryComponent
      },
      {
        path: 'statistics',
        component: GamesStatisticsComponent
      },
      {
        path: '',
        redirectTo: '/library',
        pathMatch: 'full'
      },
    ]),
    BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule, MdSliderModule, MdSelectModule,
    MdTooltipModule, MdProgressSpinnerModule, MdSlideToggleModule,
    ChartsModule, FlexLayoutModule, MdToolbarModule],
  declarations: [AppComponent,
    GamesLibraryComponent,
    GamesLibraryThumbnailComponent,
    GameDetailComponent,
    GamesStatisticsComponent,
    GamesStatisticsRankingComponent,
    GamesStatisticsGlobalComponent,
    GamesStatisticsYearComponent,
    OnlineMenuComponent],
  bootstrap: [AppComponent],
  providers: [GameLibraryService, CollectionStatisticsService]
})
export class AppModule { }
