import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { IRepositoryViewModel } from './repository.viewmodel';
import { RepositoryActions } from '../../actions/repository/repository.actions'
import { RepositorySearchService } from '../../services/repository-search.service';

@Component({
    selector: 'repository',
    templateUrl: 'repository.component.html',
    styleUrls: ['repository.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Repository extends Localization {
    @Input() viewModel: IRepositoryViewModel;
    @Input() showResults: boolean;

    constructor(public locale: LocaleService,
        public translation: TranslationService,
        private router: Router,
        private repositoryActions: RepositoryActions,
        private repositorySearch: RepositorySearchService) {
        super(locale, translation);
    }

    isHidden() {
        return this.showResults ? "hidden" : "";
    }
    isSearchResultsVisible() {
        return this.showResults ? "visible" : "hidden";
    }
    onFilterChanged(repositoryViewModel: IRepositoryViewModel) {
        var selectedValue = repositoryViewModel.selectedFilter;
        var repositories = this.repositorySearch.sortRepositoriesByFilter(selectedValue);
        var appData = { repositories: repositories };
        this.repositoryActions.sortRepositories(appData);
    }
}