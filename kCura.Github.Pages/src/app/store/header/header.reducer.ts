import { IAppState } from "../store";
import * as actions from '../../actions';
import { referenceReducerFactory, collectionReducerFactory, IReference, IAction } from "../common";

export interface IHeaderState {
    isHidden: boolean
}

const INIT_STATE: IHeaderState = {
    isHidden: false
}

export function headerReducer(state = INIT_STATE, action: IAction): IHeaderState {
    let newState: IHeaderState = state;

    switch (action.type) {
        case actions.HeaderActions.TOGGLE_SEARCH:
            newState = { ...state, isHidden: !state.isHidden };
            break;
    }
    return newState;
}