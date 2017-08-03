import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { IPartnerPanelViewModel } from './partner-panel.viewmodel';
import { IPartnerPanelItemViewModel } from './partner-panel-item';
import { SearchActions } from '../../actions';
import { RepositorySearchService } from '../../services/repository-search.service'

@Component({
    selector: 'partner-panel',
    templateUrl: 'partner-panel.component.html',
    styleUrls: ['partner-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PartnerPanel extends Localization {
    @Input() viewModel: IPartnerPanelViewModel;


    constructor(public locale: LocaleService,
        public translation: TranslationService,
        private searchActions: SearchActions,
        private router: Router,
        private repositorySearch: RepositorySearchService) {
        super(locale, translation);
    }

    onPartnerSelected(partner: IPartnerPanelItemViewModel) {
        let repositoryIds = this.repositorySearch.searchRepositoriesByText(partner.name);

        var searchModel = { searchText: partner.name, isVisible: true, showResults: true, topic: {}, resultsCount: repositoryIds.length, showTopics: false, repositoryIds: repositoryIds};

        this.searchActions.toggleSearchResults(searchModel);
    }

    ngOnInit() {
        this.viewModel.rowsNeeded = Math.ceil(this.viewModel.panelItemCount / 4);
        this.viewModel.shouldShowMorePartners = this.viewModel.rowsNeeded > 2;

        //calculate how much negative margin is needed to clip layout
        this.viewModel.heightNeeded = this.viewModel.rowsNeeded * 62.5;
        this.viewModel.height = 125;


    }

    onShowMorePartners() {
        this.viewModel.expanded = !this.viewModel.expanded;
        this.viewModel.height = this.viewModel.expanded ? this.viewModel.heightNeeded : 125;
    }

}