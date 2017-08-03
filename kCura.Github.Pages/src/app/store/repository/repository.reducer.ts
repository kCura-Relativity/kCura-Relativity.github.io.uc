import { IAppState } from "../../store";
import { IAction } from '../common';
import * as actions from '../../actions';

export interface IRepositoryItem {
    id: number;
    name: string;
    full_name: string;
    description: string;
    forks_count: number;
    stargazers_count: number;
    html_url: string;
    language: string;
    topics: string[];
    partner: string;
    isFeatured: boolean;
    pushed_at: Date;
    authorType: string;
    projectType: string;
}

export function repositoryReducer(state: IRepositoryItem[] = [], action: IAction): IRepositoryItem[] {
    let app = action.data as IAppState;
    switch (action.type) {
        case actions.AppStateActions.INIT_STATE:
        case actions.AppStateActions.ADD_REPOS:
            return app.repositories && [...app.repositories] || [];
        case actions.RepositoryActions.SORT_REPOSITORY:
            return app.repositories && [...app.repositories] || [];
        default:
            return state;
    }
}