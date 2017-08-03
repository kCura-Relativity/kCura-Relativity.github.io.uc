import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../../store';

@Injectable()
export class AppStateActions {
    static INIT_STATE = 'init_app_state';
    static ADD_REPOS = 'add_repos';

    constructor(private ngRedux: NgRedux<IAppState>) { }

    initAppState(appState) {
        this.ngRedux.dispatch({
            type: AppStateActions.INIT_STATE,
            data: appState
        });
    }

    addRepos(appState) {
        this.ngRedux.dispatch({
            type: AppStateActions.ADD_REPOS,
            data: appState
        });
    }
}