import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../../store';
import {ISearchState} from '../../store/search/search.reducer'

@Injectable()
export class SearchActions {
    static EXECUTE_SEARCH = 'execute_search';
    static TOGGLE_SEARCH_RESULTS = 'toggle_search_results';
    static TOGGLE_TOPICS = 'toggle_topics';

    constructor(private ngRedux: NgRedux<IAppState>) { }

    executeSearch(searchState: ISearchState) {
        this.ngRedux.dispatch({
            type: SearchActions.EXECUTE_SEARCH,
            data: searchState
        });
    }

    toggleTopics(searchState: ISearchState) {
        this.ngRedux.dispatch({
            type: SearchActions.TOGGLE_TOPICS,
            data: searchState
        });
    }

    toggleSearchResults(searchState: ISearchState) {
        this.ngRedux.dispatch({
            type: SearchActions.TOGGLE_SEARCH_RESULTS,
            data: searchState
        });
    }
}