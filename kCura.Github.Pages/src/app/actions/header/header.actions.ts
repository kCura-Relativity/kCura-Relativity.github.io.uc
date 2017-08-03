import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../../store';

@Injectable()
export class HeaderActions {
    static TOGGLE_SEARCH = 'toggle_search';

    constructor(private ngRedux: NgRedux<IAppState>) { }

    toggleSearch() {
        this.ngRedux.dispatch({
            type: HeaderActions.TOGGLE_SEARCH
        });
    }
}