// Author: nwinder

export interface IAction {
    type: string;
    data: any
}

export interface IReference {
    id: string,
    deleted?: boolean,
    new?: boolean
}

/*
*   A factory used to create a reducer for collections.
*   @param name The name of the entity e.g. "notification" in the case of "add_notification" action type.
*   @param selector The function used to select the properties that should be applied when adding or updateing an entity. This is used to limit to the ID property in the case of reference updates.
*/
function factory<T extends IReference>(name: string, selector: (data: IReference) => IReference, softDelete: boolean): (state: T[], action: IAction) => T[] {
    var func = (state: T[] = [], action: any) => {
        let actionData = action.data as IReference[];

        switch (action.type) {
            case "add_" + name:
                if (softDelete) {
                    var refs = action.data.map(selector);
                    refs.forEach(a => a.new = true);
                    return [...state, ...refs];
                }
                else {
                    return [...state, ...action.data.map(selector)];
                }
            case "remove_" + name:
                if (softDelete) {
                    return state.map(v => {
                        var data = actionData.filter(d => d.id === v.id);
                        if (data.length > 0) {
                            return Object.assign({}, v, { deleted: true });
                        }
                        return v;
                    });
                }
                else {
                    return state.filter((v, i) => {
                        if (actionData.some(m => m.id === v.id)) {
                            return false;
                        }
                        return true;
                    });
                }
            case "update_" + name:
                return state.map(v => {
                    var data = actionData.filter(d => d.id === v.id);
                    if (data.length > 0) {
                        return Object.assign({}, v, selector(data[0]));
                    }
                    return v;
                });
            default:
                return state;
        }
    }

    return func;
}


export function referenceReducerFactory<T extends IReference>(name: string, softDelete: boolean = false) {
    var func = factory<T>(name, o => ({id : o.id}), softDelete);
    return func;
}

export function collectionReducerFactory<T extends IReference>(name: string, softDelete: boolean = false): (state: T[], action: IAction) => T[] {
    var func = factory<T>(name, o => o, softDelete);
    return func;
}
