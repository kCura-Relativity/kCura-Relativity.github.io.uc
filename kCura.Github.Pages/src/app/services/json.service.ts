import { Injectable } from '@angular/core';
import { AppStateActions } from '../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { Partner } from '../models/partner';
import { Topic } from '../models/topic';
import { FeaturedRepo } from '../models/featuredRepo';
import { Repo } from '../models/repo';

@Injectable()
export class JsonService {
    constructor(private ngRedux: NgRedux<IAppState>,
        private appStateActions: AppStateActions,
        private http: Http) {

        this.headers.set("Content-Type", "application/json");
        this.requestOptions.headers = this.headers;
    }

    private requestOptions: RequestOptionsArgs = {};
    private headers: Headers = new Headers();
    private partners: string;

    getOrganizations(): Observable<Partner[]> {
        return this.http.get("data/organizations.json", this.requestOptions).map((res: Response) => res.json() as Partner[]);
    }
    getTopics(): Observable<Topic[]> {
        return this.http.get("data/topics.json", this.requestOptions).map((res: Response) => res.json() as Topic[]);
    }
    getFeaturedRepos(): Observable<FeaturedRepo[]> {
        return this.http.get("data/featured-repos.json", this.requestOptions).map((res: Response) => res.json() as FeaturedRepo[]);
    }
    getRepos(): Observable<Repo[]> {
        return this.http.get("data/repositories.json", this.requestOptions).map((res: Response) => res.json() as Repo[]);
    }
}

