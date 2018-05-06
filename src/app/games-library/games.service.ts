import { Injectable } from '@angular/core';

import { Game } from '../model/game';

@Injectable()
export class GamesService {

    public filterGamesWithName(games: Game[], gameName: string, expansion: boolean, previouslyOwned: boolean, playerCount: number): Game[] {
        const filteredGames = [];

        for (const game of games) {
            if (this.matchGameNameFilter(game, gameName)
                && this.matchExpansionFilter(game, expansion)
                && this.matchPreviouslyOwnedFilter(game, previouslyOwned)
                && this.matchPlayerCountFilter(game, playerCount)) {
                filteredGames.push(game);
            }
        }

        return filteredGames;
    }

    public filterGames(games: Game[], expansion: boolean, previouslyOwned: boolean, playerCount: number): Game[] {
        return this.filterGamesWithName(games, null, expansion, previouslyOwned, playerCount);
    }

    private matchGameNameFilter(game: Game, gameName: string): boolean {
        if (!gameName || gameName === '') {
            return true;
        }
        return game.name.toLowerCase().indexOf(gameName.toLowerCase()) !== -1;
    }

    private matchExpansionFilter(game: Game, expansion: boolean): boolean {
        if (expansion === true || game.data === null) {
            return true;
        }
        return game.data.type === 'GAME';
    }

    private matchPreviouslyOwnedFilter(game: Game, previouslyOwned: boolean): boolean {
        if (previouslyOwned === true) {
            return true;
        }
        return game.status === 'OWNED';
    }

    private matchPlayerCountFilter(game: Game, playerCount: number): boolean {
        return game.data === null || playerCount === null || game.data.minPlayers <= playerCount && playerCount <= game.data.maxPlayers;
    }

    public sortByName(games: Game[], asc: boolean): Game[] {
        if (!games) {
            return [];
        }
        const order: number = this.getOrder(asc);
        return games.sort((g1, g2) => (g1.name.localeCompare(g2.name)) * order);
    }

    public sortByPlaysCount(games: Game[], asc: boolean): Game[] {
        if (!games) {
            return [];
        }
        const order: number = this.getOrder(asc);

        return games.sort((g1, g2) => (
            (g1.playsCount === undefined ? 0 : g1.playsCount)
            - (g2.playsCount === undefined ? 0 : g2.playsCount)) * order);
    }

    public sortByPlaysDate(games: Game[], asc: boolean): Game[] {
        if (!games) {
            return [];
        }
        const order: number = this.getOrder(asc);
        return games.sort((g1: Game, g2: Game) => (
            (this.getLastPlay(g2).localeCompare(this.getLastPlay(g1)))
            * order));
    }

    private getLastPlay(game: Game): string {
        let lastPlayDate: Date = null;
        if (game && game.plays) {
            game.plays.forEach(play => {
                if (lastPlayDate === null || lastPlayDate < play.date) {
                    lastPlayDate = play.date;
                }
            });
        }
        if (lastPlayDate === null) {
            return '';
        }
        return lastPlayDate + '';
    }

    public sortByRating(games: Game[], asc: boolean): Game[] {
        const order: number = this.getOrder(asc);
        return games.sort((g1, g2) => (this.getRating(g1) - this.getRating(g2)) * order);
    }

    private getRating(game: Game): number {
        return game.data == null ? 0 : game.data.rating;
    }

    private getOrder(asc: boolean): number {
        if (asc) {
            return 1;
        } else {
            return -1;
        }
    }
}
