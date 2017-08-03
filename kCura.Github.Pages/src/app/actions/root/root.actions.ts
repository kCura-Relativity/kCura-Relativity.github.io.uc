import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../../store';

@Injectable()
export class RootActions {
    static TOGGLE_SEARCH = 'toggle_search';

    constructor(private ngRedux: NgRedux<IAppState>) { }

    toggleSearch() {
        this.ngRedux.dispatch({
            type: RootActions.TOGGLE_SEARCH
        });
    }
}