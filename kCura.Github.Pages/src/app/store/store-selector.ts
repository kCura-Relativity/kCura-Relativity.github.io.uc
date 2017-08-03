import { Observable } from 'rxjs/Observable';
import { IAppState } from './store';
import { NgRedux } from '@angular-redux/store';

// This class is responsible for observing a specified number of slices of our Redux store and ONLY
// firing the callback when those pieces change. Furthermore, the callback will not be fired until
// every observable reports back at least once to avoid unnecessary firings when first hooking up to the store.
export class StoreSelector<T> {

    private _observable: Observable<T>;

    get observable(): Observable<T> {
        return this._observable;
    }

    constructor(
        private selectors: string[],
        private transformer: (state: IAppState) => T) {

        if (!NgRedux.instance)
            throw "ngRedux cannot be null or undefined.";

        if (!selectors || selectors.length === 0)
            throw "selectors cannot be null or empty.";

        if (!transformer)
            throw "transformer cannot be null or undefined.";

        let stateSliceObservables: Observable<any>[] = selectors.map(s => NgRedux.instance.select(s));

        this._observable = Observable.combineLatest(...stateSliceObservables)
            .map(v => {
                return this.onSliceObservableFired(v)
            })
            // This makes the observable "hot" and returns the last published value to a new subscriber.
            .publishReplay(1).refCount();
    }

    private onSliceObservableFired(values: any[]): T {
        return this.transformer(NgRedux.instance.getState());
    }
}