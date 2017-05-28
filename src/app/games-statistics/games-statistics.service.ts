import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CollectionStatistics } from '../model/collectionStatistics';

@Injectable()
export class CollectionStatisticsService {

    constructor(private http: Http) { }

    getCollectionStatisticsFromFile(): Observable<CollectionStatistics> {
        return this.http.get('assets/collection-stats.json').map((response: Response) => {
            return <CollectionStatistics>response.json();
        }).catch(this.handleError);
    }

    getCollectionStatistics(bggUser: string, //
                            service: string, //
                            includeExpansion: boolean, //
                            includePreviouslyOwned: boolean): Observable<CollectionStatistics> {
        return this.http.get(
            service + '/bgg/collection/' + bggUser //
            + '/stats?includeExpansions=' + includeExpansion //
            + '&includePreviouslyOwned=' + includePreviouslyOwned) //
            .map((response: Response) => { //
            return <CollectionStatistics>response.json();
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }

}
