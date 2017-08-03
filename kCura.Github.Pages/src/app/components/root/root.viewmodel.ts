import { IAppState } from "../../store";
import { StoreSelector } from "../../store/store-selector";

export interface IRootViewModel {
    isSearchVisible: boolean;
    showResults: boolean;
    showTopics: boolean;
}

export class RootViewModelSelector extends StoreSelector<IRootViewModel> {
    constructor() {
        super(['header', 'search'], getRootViewModelFromAppState);
    }
}

export function getRootViewModelFromAppState(state: IAppState): IRootViewModel{
    return { isSearchVisible: state.search.isVisible, showResults: state.search.showResults, showTopics: state.search.showTopics };
}