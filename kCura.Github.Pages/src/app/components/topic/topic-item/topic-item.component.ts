import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { ITopicItemViewModel } from "./topic-item.viewmodel";

@Component({
    selector: 'topic-item',
    templateUrl: './topic-item.component.html',
    styleUrls: ['./topic-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TopicItem extends Localization {
    @Input() viewModel: ITopicItemViewModel;

    constructor(public locale: LocaleService,
        public translation: TranslationService,
        private router: Router) {
        super(locale, translation);
    }
}
