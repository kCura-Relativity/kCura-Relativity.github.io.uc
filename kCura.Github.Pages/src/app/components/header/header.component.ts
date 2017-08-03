import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { IHeaderViewModel } from './header.viewmodel';
import { HeaderActions } from '../../actions';
import { RootActions } from '../../actions';
@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    //host: {
    //    '[@showSearch]': "viewModel.isSearch"
    //}
})

export class Header extends Localization {
    @Input() viewModel: IHeaderViewModel;

    constructor(public locale: LocaleService,
        public translation: TranslationService,
        private router: Router,
        private headerActions: HeaderActions,
        private rootActions: RootActions) {
        super(locale, translation);
    }

    onSearchClicked() {
        //this.headerActions.toggleSearch();
        this.rootActions.toggleSearch();
    }
}