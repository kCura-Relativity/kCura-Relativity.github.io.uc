import { IAppState } from "../../store";
import { IAction } from '../common';
import * as actions from '../../actions';

export interface IFeaturedRepo {
    partner: string,
    repository: string
}

export function featuredReposReducer(state: IFeaturedRepo[] = [], action: IAction): IFeaturedRepo[] {
    switch (action.type) {
        case actions.AppStateActions.INIT_STATE:
            let app = action.data as IAppState;
            return app.featuredRepos && [...app.featuredRepos] || [];
        default:
            return state;
    }
}