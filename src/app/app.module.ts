import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// auth service
import { AuthService } from './auth-service';

// ng bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// toaster
import { ToasterModule, ToasterService } from 'angular2-toaster';

// material2
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdCheckboxModule, MdSliderModule, MdSelectModule,
  MdTooltipModule, MdProgressSpinnerModule, MdSlideToggleModule,
  MdToolbarModule, MdDialogModule
} from '@angular/material';
import 'hammerjs';

// flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

// app
import { AppComponent } from './app.component';
// app components & services for library
import { GamesLibraryComponent } from './games-library/games-library.component';
import { GamesLibraryThumbnailComponent } from './games-library/games-library-thumbnail.component';
import { GameDetailComponent } from './games-library/game-detail.component';
import { GameFullDetailComponent } from './games-library/game-full-detail.component';
import { GamesPlaysComponent } from './games-library/games-plays.component';
import { GameLibraryService } from './games-library/games-library.service';
import { PlayerCountPipe } from './pipes/player-count-pipe';
import { ExpansionPipe } from './pipes/expansion-pipe';
import { PreviouslyOwnedPipe } from './pipes/previously-owned-pipe';
import { SortByNamePipe } from './pipes/sort-by-name-pipe';
import { SortByRatingPipe } from './pipes/sort-by-rating-pipe';
import { SortByPlaysCountPipe } from './pipes/sort-by-plays-count-pipe';
// app components & services for statistics
import { GamesStatisticsComponent } from './games-statistics/games-statistics.component';
import { GamesStatisticsRankingComponent } from './games-statistics/games-statistics-ranking.component';
import { GamesStatisticsYearComponent } from './games-statistics/games-statistics-year.component';
import { GamesStatisticsGlobalComponent } from './games-statistics/games-statistics-global.component';
import { GamesStatisticsPlaysComponent } from './games-statistics/games-statistics-plays.component';
import { CollectionStatisticsService } from './games-statistics/games-statistics.service';
// menu component
import { OnlineMenuComponent } from './online-menu/online-menu.component';


const appRoutes: Routes = [
  { path: 'library', component: GamesLibraryComponent },
  { path: 'statistics', component: GamesStatisticsComponent },
  { path: 'plays', component: GamesPlaysComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule, MdSliderModule, MdSelectModule,
    MdTooltipModule, MdProgressSpinnerModule, MdSlideToggleModule,
    ChartsModule, FlexLayoutModule, MdToolbarModule, MdDialogModule,
    ToasterModule],
  exports: [
    GameFullDetailComponent
  ],
  declarations: [AppComponent,
    GamesLibraryComponent,
    GamesLibraryThumbnailComponent,
    GameDetailComponent,
    GamesPlaysComponent,
    GamesStatisticsComponent,
    GamesStatisticsRankingComponent,
    GamesStatisticsGlobalComponent,
    GamesStatisticsYearComponent,
    GamesStatisticsPlaysComponent,
    OnlineMenuComponent,
    GameFullDetailComponent,
    PlayerCountPipe, ExpansionPipe, PreviouslyOwnedPipe, SortByNamePipe, SortByRatingPipe, SortByPlaysCountPipe],
  bootstrap: [AppComponent],
  providers: [GameLibraryService, CollectionStatisticsService, ToasterService, AuthService],
  entryComponents: [GameFullDetailComponent]
})
export class AppModule { }
