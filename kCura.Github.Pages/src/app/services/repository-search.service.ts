import { Injectable } from '@angular/core';
import { IAppState } from '../store';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { IRepositoryItem } from '../store/repository/repository.reducer';

@Injectable()
export class RepositorySearchService {
    constructor(private ngRedux: NgRedux<IAppState>) {
    }

    searchRepositoriesByText(text: string): number[] {

        var searchText = text.toLowerCase();

        var searchResults = this.ngRedux.getState().repositories.filter(f => (f.name.toLowerCase().indexOf(searchText) >= 0)
            || (f.partner.toLowerCase().indexOf(searchText) >= 0)
            || (f.description.toLowerCase().indexOf(searchText) >= 0)
            || (f.topics && f.topics.map(toLower).includes(searchText)));

        let resultIds: number[] = searchResults.map(x => {
            return x.id
        });

        return resultIds;
    }

    sortRepositoriesByAuthorType(authorType: string) {
        var searchText = authorType.toLowerCase();

        var searchResults = this.ngRedux.getState().repositories.filter(f => f.authorType.toLowerCase() === searchText);

        let resultIds: number[] = searchResults.map(x => {
            return x.id
        });
        return resultIds;
    }

    sortRepositoriesByFilter(filter: string) {

        var repositories = this.ngRedux.getState().repositories;
        switch (filter) {
            case "Popular":
                repositories = repositories.sort((a: IRepositoryItem, b: IRepositoryItem) => b.stargazers_count - a.stargazers_count);
                break;
            case "Oldest":
                repositories = repositories.sort((a: IRepositoryItem, b: IRepositoryItem) => { return new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime() });
                break;
            case "Newest":
                repositories = repositories.sort((a: IRepositoryItem, b: IRepositoryItem) => { return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime() });
                break;
        }

        return repositories;
    }
}
export function toLower(value: string): string {
    return value.toLowerCase();
}
export function getTime(date ?: Date) {
    return date != null ? date.getTime() : 0;
}

