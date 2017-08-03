import { IAppState } from "../store";
import * as actions from '../../actions';
import { IReference, IAction } from '../common';

export interface ISearchState {
    isVisible: boolean,
    searchText: string,
    showResults: boolean,
    showTopics: boolean,
    repositoryIds: number[],
    resultsCount: number
}

const INIT_STATE: ISearchState = {
    isVisible: false,
    searchText: '',
    showResults: false,
    showTopics: false, 
    repositoryIds: [],
    resultsCount: 0
}

export function searchReducer(state = INIT_STATE, action: IAction): ISearchState {
    let newState: ISearchState = state;
    let app = action.data as ISearchState;
    switch (action.type) {
        case actions.HeaderActions.TOGGLE_SEARCH:
            var isVisible = !state.isVisible;
            newState = { ...state, isVisible: !state.isVisible, showResults: false, searchText: !isVisible ? "" : state.searchText, showTopics: false, repositoryIds: state.repositoryIds };
            break;
        case actions.SearchActions.TOGGLE_SEARCH_RESULTS:
            newState = { ...state, searchText: app.searchText, showResults: app.showResults, isVisible: app.isVisible, showTopics: false, repositoryIds: app.repositoryIds, resultsCount: app.resultsCount };
            break;
        case actions.SearchActions.TOGGLE_TOPICS:
            newState = { ...state, showTopics: !app.showTopics };
            break;
        case actions.SearchActions.EXECUTE_SEARCH:
            newState = { ...state, repositoryIds: app.repositoryIds, resultsCount: app.resultsCount}
    }
    return newState;
}