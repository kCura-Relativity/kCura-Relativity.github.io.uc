import { IAppState } from "../../store";
import { StoreSelector } from "../../store/store-selector";
import { ITopicItemViewModel } from "./topic-item";

export interface ITopicViewModel {
    topics: ITopicItemViewModel[]
}

export class TopicViewModelSelector extends StoreSelector<ITopicViewModel>{
    constructor() {
        super(['topics']
            , getTopicSelectorViewModelFromAppState);
    }
}

export function getTopicSelectorViewModelFromAppState(state: IAppState): ITopicViewModel {
    return { topics:  state.topics };
}