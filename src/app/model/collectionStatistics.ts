export class CollectionStatistics {
  lasUpdate: string;
  totalSize = 0;
  totalPlays = 0;
  gamesByRatingLevel: { [name: string]: number } = {};
  gamesByYear: { [year: number]: number } = {};
  playsByYear: { [year: number]: number } = {};
}
