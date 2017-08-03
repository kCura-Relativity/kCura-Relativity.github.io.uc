import { IAppState } from "../../store";
import { IAction } from '../common';
import * as actions from '../../actions';

export interface IPartner {
    name: string,
    gitHubOrgName: string
    index: number
    authorType: string;
}

export function partnersReducer(state: IPartner[] = [], action: IAction): IPartner[] {
    switch (action.type) {
        case actions.AppStateActions.INIT_STATE:
            let app = action.data as IAppState;
            return app.partners && [...app.partners] || [];
        default:
            return state;
    }
}