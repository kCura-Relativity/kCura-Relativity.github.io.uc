import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../../store';
import { IRepositoryItem } from '../../store/repository/repository.reducer';

@Injectable()
export class RepositoryActions {
    static SORT_REPOSITORY = 'sort_repository';

    constructor(private ngRedux: NgRedux<IAppState>) { }

    sortRepositories(appState: IAppState) {
        this.ngRedux.dispatch({
            type: RepositoryActions.SORT_REPOSITORY,
            data: appState
        });
    }
}