import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { IPartnerPanelItemViewModel } from './partner-panel-item.viewmodel';

@Component({
    selector: 'partner-panel-item',
    templateUrl: './partner-panel-item.component.html',
    styleUrls: ['./partner-panel-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PartnerPanelItem {
    @Input() viewModel: IPartnerPanelItemViewModel;

    @Input() index: number;

    @Input() morePartnersIndex: number;

    displayMorePartners() {
        if (this.index == this.morePartnersIndex)
            return true;

        return false;
    }
}