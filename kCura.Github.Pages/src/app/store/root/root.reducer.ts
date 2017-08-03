import { IAppState } from "../store";
import * as actions from '../../actions';
import { ISearchState } from '../search/search.reducer';
import { referenceReducerFactory, collectionReducerFactory, IReference, IAction } from "../common";

export interface IRootState {
    isSearchVisible: boolean;
    showResults: boolean;
    showTopics: boolean;
}

const INIT_STATE: IRootState = {
    isSearchVisible: false,
    showResults: false,
    showTopics: false
}

export function rootReducer(state = INIT_STATE, action: IAction): IRootState {
    let newState: IRootState = state;
 
    switch (action.type) {
        case actions.RootActions.TOGGLE_SEARCH:
            var isSearchVisible = !state.isSearchVisible;
            newState = { ...state, isSearchVisible: isSearchVisible, showResults: state.showResults, showTopics: false};
            break;
        case actions.SearchActions.TOGGLE_SEARCH_RESULTS:
            let app = action.data as ISearchState;
            newState = { ...state, isSearchVisible: app.isVisible, showResults: app.showResults, showTopics: false };
            break;
    }
    return newState;
}