export class CollectionStatistics {
  lasUpdate: string;
  totalSize: number;
  totalPlays: number;
  gamesByRatingLevel: { [name: string]: number };
  gamesByYear: { [year: number]: number };
}
