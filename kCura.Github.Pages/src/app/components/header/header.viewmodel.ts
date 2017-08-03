import { IAppState } from "../../store";
import { StoreSelector } from "../../store/store-selector";

export interface IHeaderViewModel {
    isHidden: boolean
}

export class HeaderViewModelSelector extends StoreSelector<IHeaderViewModel> {
    constructor() {
        super(['header',
            ],
            getHeaderViewModelFromAppState);
    }
}

export function getHeaderViewModelFromAppState(state: IAppState): IHeaderViewModel {
    if (state == null)
        return { isHidden: true };
    return { isHidden: state.header.isHidden };
}