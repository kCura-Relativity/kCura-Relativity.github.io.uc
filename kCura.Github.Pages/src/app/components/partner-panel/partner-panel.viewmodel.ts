import { IAppState } from "../../store";
import { StoreSelector } from "../../store/store-selector";
import { IPartnerPanelItemViewModel } from './partner-panel-item';

export interface IPartnerPanelViewModel{
    partnerPanelItems: IPartnerPanelItemViewModel[];
    panelItemCount: number;
    rowsNeeded: number;
    shouldShowMorePartners: boolean;
    expanded: boolean;
    height: number;
    heightNeeded: number;
}

export class PartnerPanelViewModelSelector extends StoreSelector<IPartnerPanelViewModel> {
    constructor() {
        super(['partnerPanelItems',
        ],
            getPartnerPanelViewModelFromAppState);
    }
}

export function getPartnerPanelViewModelFromAppState(state: IAppState): IPartnerPanelViewModel{
   
    return { partnerPanelItems: state.partners, panelItemCount: state.partners.length-1, rowsNeeded: 2, shouldShowMorePartners: false, expanded: false, height: 125, heightNeeded: 125 };    
}