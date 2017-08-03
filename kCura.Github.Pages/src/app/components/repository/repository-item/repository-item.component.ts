import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { IRepositoryItemViewModel } from './repository-item.viewmodel';

@Component({
    selector: 'repository-item',
    templateUrl: './repository-item.component.html',
    styleUrls: ['./repository-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RepositoryItem {
    @Input() viewModel: IRepositoryItemViewModel;

    authorTypeToClass() {
        switch (this.viewModel.authorType) {
            case 'open source community':
                return 'open-source';
            case 'development partners':
                return 'partner';
            case 'relativity':
            default:
                return 'relativity';
        }
    }
    projectTypeToClass() {
        switch (this.viewModel.projectType) {
            case 'script':
                return 'script';
            case 'tool':
                return 'tool';
            case 'app':
            default:
                return 'app';
        }
    }
}