import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import auth0 from 'auth0-js';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserMetadata } from './model/userMetadata';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService implements OnInit {

    auth0 = new auth0.WebAuth({
        clientID: 'UrkVR9RkXyq7H0fB-NKDYOYefXTlB56O',
        domain: 'fdib.eu.auth0.com',
        responseType: 'token id_token',
        audience: 'https://fdib.eu.auth0.com/userinfo',
        redirectUri: environment.auth0RedirectUrl,
        leeway: 60,
        scope: 'openid profile email'
    });

    ngOnInit(): void {
    }

    constructor(public router: Router, private http: Http) { }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.router.navigate(['/home']);
            } else if (err) {
                this.router.navigate(['/home']);
                console.log(err);
            }
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    getUserMetadata(): Observable<UserMetadata> {
        const headers = new Headers();
        const authToken = localStorage.getItem('access_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        const options = new RequestOptions({ headers: headers });
        const url = 'https://fdib.eu.auth0.com/userinfo';
        return this.http.get(url, options) //
            .map((response: Response) => { //
                return <UserMetadata>response.json()['https://fdib:eu:auth0:com/userinfo/user_metadata'];
            }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}
