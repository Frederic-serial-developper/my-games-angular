export class CollectionStatistics {
  totalSize: number;
  totalPlays: number;
  gamesByRatingLevel : { [name: string]: number };
  gamesByYear : { [year: number]: number };
}
