import { Component, ChangeDetectionStrategy, Input, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from "@angular/router";
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { ISearchViewModel } from './search.viewmodel';
import { SearchActions } from '../../actions';
import { RootActions } from '../../actions';
import { RepositorySearchService } from '../../services/repository-search.service'

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})   

export class Search extends Localization{
    @Input() viewModel: ISearchViewModel;
    @ViewChild("searchBox") private _inputElement: ElementRef;

    searchTextLength: number = 0;
    topicsLeft = [];
    topicsRight = [];



    constructor(public locale: LocaleService,
        public translation: TranslationService,
        private router: Router,
        private searchActions: SearchActions,
        private repositorySearch: RepositorySearchService,
        private rootActions: RootActions
    ) {
        super(locale, translation);
    }

    ngOnChanges(...args: any[]) {
        if (this.viewModel.isVisible == true) {
            this._inputElement.nativeElement.focus();
        }
    }

    ngOnInit() {
        this.topicsLeft = this.viewModel.topic.topics;
        this.topicsRight = this.topicsLeft.splice(0, this.topicsLeft.length / 2);
    }

    onAuthorSelected(author: string) {
        let repositoryIds = this.repositorySearch.sortRepositoriesByAuthorType(author);
        var searchModel = { searchText: author, isVisible: true, showResults: true, topic: {}, resultsCount: repositoryIds.length, showTopics: false, repositoryIds: repositoryIds };
        this.searchActions.toggleSearchResults(searchModel);
    }

    onTopicSelected(topic: string) {

        let repositoryIds = this.repositorySearch.searchRepositoriesByText(topic);
        var searchModel = { searchText: topic, isVisible: true, showResults: true, topic: {}, resultsCount: repositoryIds.length, showTopics: false, repositoryIds: repositoryIds };
        this.searchActions.toggleSearchResults(searchModel);
    }

    onSearchClosed() {     
        this.viewModel.searchText = "";
        if (!this.viewModel.showResults) {
            this.rootActions.toggleSearch();
        }
        else {
            this.viewModel.showResults = false;
            this.viewModel.isVisible = true;
            this.searchActions.toggleSearchResults(this.viewModel);
        }

        this.viewModel.showTopics = false;
    }

    onSearchTextChanged(value: string) {
        this.viewModel.searchText = value;
        this.searchTextLength = value.length;
        // debounce logic
        //make sure its unchanged to avoid sequential firing
        setTimeout(() => {
            if (this.searchTextLength > 0)
                this.viewModel.isVisible = true;

            if (value.length == this.searchTextLength)
                this.viewModel.showResults = this.searchTextLength > 2;

            this.viewModel.repositoryIds = this.repositorySearch.searchRepositoriesByText(this.viewModel.searchText);
            this.viewModel.resultsCount = this.viewModel.repositoryIds.length;
            this.searchActions.executeSearch(this.viewModel);
            this.searchActions.toggleSearchResults(this.viewModel);
        }, 1000);


        if (this.searchTextLength < 2) {
            this.viewModel.showResults = false;
            this.searchActions.toggleSearchResults(this.viewModel);
        }
    }

    toggleShowAllTopics() {
        this.searchActions.toggleTopics(this.viewModel);
    }

    subscribedToggleSearchMethod() {
        this._inputElement.nativeElement.focus();
    }

}