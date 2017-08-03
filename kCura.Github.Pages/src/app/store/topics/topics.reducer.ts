import { IAppState } from "../store";
import * as actions from '../../actions';
import { IAction } from "../common";

export interface ITopicItem {
    name: string
}

export function topicsReducer(state: ITopicItem[] = [], action: IAction): ITopicItem[] {
    switch (action.type) {
        case actions.AppStateActions.INIT_STATE:
            let app = action.data as IAppState;
            return app.topics && [...app.topics] || [];
        default:
            return state;
    }
}