import { IAppState } from "../../store";
import { StoreSelector } from "../../store/store-selector";
import { ITopicViewModel } from '../topic';

export interface ISearchViewModel {
    isVisible: boolean,
    searchText: string,
    topic: ITopicViewModel,
    showResults: boolean,
    showTopics: boolean,
    resultsCount: number;
    repositoryIds: number[];
}

export class SearchViewModelSelector extends StoreSelector<ISearchViewModel> { 

    constructor() {
        super(['search',
        ],
            getSearchViewModelFromAppState);
    }
}

export function getSearchViewModelFromAppState(state: IAppState): ISearchViewModel {
    if (state == null)
        return { isVisible: false, searchText: '', topic: { topics: [] }, showResults: false, resultsCount: 0, showTopics: false, repositoryIds: [] };
   
    return { isVisible: state.header.isHidden, searchText: state.search.searchText, topic: { topics: state.topics }, showResults: state.search.showResults, resultsCount: state.search.resultsCount, showTopics: state.search.showTopics, repositoryIds: state.search.repositoryIds };
}
