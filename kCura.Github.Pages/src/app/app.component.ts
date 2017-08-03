import { Component, OnInit} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Repo } from "./models/repo";
import { Partner } from "./models/partner"
import { Topic } from "./models/topic"
import { FeaturedRepo } from "./models/featuredRepo";
import { GitHubApiService } from "./services/github.service";
import { JsonService } from './services/json.service';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { AppStateActions } from './actions/app-state/app-state.actions';

@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./main.scss', './fonts.scss'],
})
export class AppComponent {
    repos: Repo[] = [];
    organizations: Partner[] = [];
    topics: Topic[] = [];
    featuredRepos: FeaturedRepo[] = [];
    isJsonDataLoaded: boolean = false;
    constructor(private githubApiService: GitHubApiService,
        private jsonService: JsonService,
        private appStateActions: AppStateActions) {
    }
}