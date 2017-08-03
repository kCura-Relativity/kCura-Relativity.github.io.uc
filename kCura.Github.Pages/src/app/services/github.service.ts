import { Injectable } from '@angular/core';
import { AppStateActions } from '../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Repo } from '../models/repo';
import { RateLimit } from '../models/rate-limit';

@Injectable()

export class GitHubApiService {
    constructor(private ngRedux: NgRedux<IAppState>,
        private appStateActions: AppStateActions,
        private http: Http) {

        this.headers.set("Content-Type", "application/json");
        this.requestOptions.headers = this.headers;

    }
    private client_id: string = "";
    private client_secret: string = "";
    private requestOptions: RequestOptionsArgs = {};
    private headers: Headers = new Headers();
    private githubApiUrl = 'https://api.github.com/';

    getRepositories(orgName: string): Observable<Repo[]> {
        var url = this.githubApiUrl + 'orgs/' + orgName + '/repos?client_id=' + this.client_id + '&client_secret=' + this.client_secret;

        var jsonResponse = this.http.get(url, this.requestOptions).map((res: Response) => res.json() as Repo[]);
        return jsonResponse;
    }

    getRateLimit(): Observable<RateLimit> {
        var url = this.githubApiUrl + 'rate_limit?client_id=' + this.client_id + '&client_secret=' + this.client_secret;

        var jsonResponse = this.http.get(url, this.requestOptions).map((res: Response) => res.json() as RateLimit);
        return jsonResponse;
    }

}