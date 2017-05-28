import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Game } from '../model/game';

@Injectable()
export class GameLibraryService {

    constructor(private http: Http) { }

    getGamesFromFile(): Observable<Game[]> {
        return this.http.get('assets/games.json').map((response: Response) => {
            return <Game[]>response.json();
        }).catch(this.handleError);
    }

    getGames(bggUser: string, service: string, includeExpansions: boolean, includePreviouslyOwned: boolean): Observable<Game[]> {
        return this.http.get(
            service + '/bgg/collection/' + bggUser //
            + '?includeExpansions=' + includeExpansions //
            + '&includePreviouslyOwned=' + includePreviouslyOwned) //
            .map((response: Response) => { //
            return <Game[]>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }

}
