import { NgRedux } from '@angular-redux/store';

export class MockRedux extends NgRedux<any> {
    constructor() {
        super(null);
    }
    dispatch: () => {};
}