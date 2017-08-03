import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { JsonService } from '../services/json.service';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { Partner } from "../models/partner";
import { Topic } from "../models/topic";
import { Repo } from "../models/repo";
import { FeaturedRepo } from "../models/featuredRepo";
import { AppStateActions } from '../actions/app-state/app-state.actions';
import { GitHubApiService } from "../services/github.service";
import { RateLimit } from '../models/rate-limit';

@Injectable()
export class BootstrapGuard implements CanActivate {

    constructor(private locale: LocaleService,
        private translation: TranslationService,
        private appStateActions: AppStateActions,
        private jsonService: JsonService,
        private githubApiService: GitHubApiService) { }
        private organizations: Partner[] = [];
        private topics: Topic[] = [];
        private featuredRepos: FeaturedRepo[] = [];
        private repositories: Repo[] = [];

    canActivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {

            let startupTasks = [
                this.loadLocalization(),
                this.loadJsonData()
            ];

            Promise.all(startupTasks).then(
                () => {
                    resolve(true);
                    var appData = {
                        partners: this.organizations,
                        topics: this.topics,
                        featuredRepos: this.featuredRepos,
                        repositories: this.repositories
                    };
                    this.appStateActions.initAppState(appData);
                    //this.getGitHubRepoData(this.organizations);
                    
                },
                () => {
                    resolve(false);
                });
        });
    }

    // make load screen visible for at least 2 seconds for demo purposes only
    loadMinTime(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    loadLocalization(): Promise<any> {
        this.locale.addConfiguration()
            .addLanguages(['en', 'es'])
            .defineLanguage('en');
        this.locale.init();

        this.translation.addConfiguration()
            .addProvider('./languages/locale-');
        this.translation.init();

        let promise: Promise<any> = new Promise((resolve: any) => {
            this.translation.translationChanged.subscribe(
                () => {
                    resolve(true);
                },
                () => {
                    resolve(false);
                });
        });

        this.translation.init();

        return promise;
    }

    loadJsonData(): Promise<any> {

        let promise: Promise<any> = new Promise((resolve: any) => {
            Observable.forkJoin(this.jsonService.getOrganizations(), this.jsonService.getTopics(), this.jsonService.getFeaturedRepos(), this.jsonService.getRepos()).subscribe(data => {
                this.organizations = data[0];
                this.topics = data[1];
                this.featuredRepos = data[2];
                this.repositories = data[3];
                resolve(true);
            }, error => {
                console.log(error);
                resolve(false);
                });
        });

        return promise;
    }


    getGitHubDataPromise(organization: Partner): Promise<any> {
        let promise: Promise<any> = new Promise((resolve: any) => {
            let pRepos: Repo[] = [];
            try {
                this.githubApiService.getRepositories(organization.gitHubOrgName).subscribe(res => {
                    pRepos = res;
                    for (var r in pRepos) {
                        pRepos[r].partner = organization.name;
                        pRepos[r].authorType = pRepos[r].description && pRepos[r].description.includes("Project Champion") ? "development partners" : pRepos[r].description && pRepos[r].description.includes("Open Source Community") ? "open source community" : "relativity";
                        this.repositories.push(pRepos[r]);
                    }
                    resolve(true);
                });
            }
            catch (Error) {
                resolve(true);
                console.log(Error);
            }
          
        });
        return promise;
    }

    getGitHubRepositoryData(organizations: Partner[]) {
        var apiCalls = [];
        for (var o in organizations) {
            apiCalls.push(this.getGitHubDataPromise(organizations[o]));
        }
        
        Promise.all(apiCalls).then((value: any[]) => {
            console.log(this.repositories.length);
            var appData = {
                repositories: this.repositories
            };
            this.appStateActions.addRepos(appData);
        }).catch((err: any) => {
            console.log(err);
            });
    }

    getGitHubRepoData(organizations: Partner[]) {
        let rateLimit: RateLimit = new RateLimit();
        this.githubApiService.getRateLimit().subscribe(res => {
            rateLimit = res;
            if (rateLimit.rate.remaining > 0) {
                this.getGitHubRepositoryData(this.organizations.filter(x => x.gitHubOrgName));
            }
            else {
                //what do we do when we hit our rate limit?
            }
        });
       
    }
}