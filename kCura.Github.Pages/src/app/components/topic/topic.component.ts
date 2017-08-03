import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { ITopicItemViewModel } from './topic-item';
import { ITopicViewModel } from './topic.viewmodel';

@Component({
    selector: 'topic',
    templateUrl: './topic.component.html',
    styleUrls: ['./topic.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Topic extends Localization {
    @Input() viewModel: ITopicViewModel;

    constructor(public locale: LocaleService,
        public translation: TranslationService,
        private router: Router) {
        super(locale, translation);
    }
}