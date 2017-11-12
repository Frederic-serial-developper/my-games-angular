import { StatusStatistics } from 'app/model/statusStatistics';

export class CollectionByStatusStatistics {
  lasUpdate: string;

  gamesStats: StatusStatistics;
  previousGamesStats: StatusStatistics;
  expansionsStats: StatusStatistics;
  previousExpansionsStats: StatusStatistics;

  totalPlays: number;
  playsByYear: { [year: number]: number };
}
