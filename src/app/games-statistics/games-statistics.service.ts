import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CollectionByStatusStatistics } from 'app/model/CollectionByStatusStatistics';

@Injectable()
export class CollectionStatisticsService {

    constructor(private http: Http) { }

    getCollectionStatisticsFromFile(): Observable<CollectionByStatusStatistics> {
        return this.http.get('assets/collection-stats.json').map((response: Response) => {
            return <CollectionByStatusStatistics>response.json();
        }).catch(this.handleError);
    }

    getCollectionStatistics(bggUser: string, //
        service: string, //
        includeExpansion: boolean, //
        includePreviouslyOwned: boolean): Observable<CollectionByStatusStatistics> {
        if (bggUser) {
            return this.http.get(
                service + '/bgg/collection/' + bggUser //
                + '/stats?includeExpansions=' + includeExpansion //
                + '&includePreviouslyOwned=' + includePreviouslyOwned) //
                .map((response: Response) => { //
                    return <CollectionByStatusStatistics>response.json();
                }).catch(this.handleError);
        }
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }

}
