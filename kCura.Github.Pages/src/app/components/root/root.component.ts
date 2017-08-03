import { Component, ChangeDetectionStrategy, Input, EventEmitter } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { pinRoot } from './root.animations';
import { RootViewModelSelector, IRootViewModel } from './root.viewmodel';
import { HeaderViewModelSelector } from '../header';
import { SearchViewModelSelector } from '../search';
import { TopicViewModelSelector } from '../topic';
import { PartnerPanelViewModelSelector } from '../partner-panel';
import { RepositoryViewModelSelector } from '../repository';

@Component({
    selector: 'root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss'],
    animations: [
        pinRoot
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Root {

    @select(['sidebar', 'isPinned']) isPinned: Observable<boolean>
    root: RootViewModelSelector = new RootViewModelSelector();
    header: HeaderViewModelSelector = new HeaderViewModelSelector();
    search: SearchViewModelSelector = new SearchViewModelSelector();
    topic: TopicViewModelSelector = new TopicViewModelSelector();
    partnerPanel: PartnerPanelViewModelSelector = new PartnerPanelViewModelSelector();
    repository: RepositoryViewModelSelector = new RepositoryViewModelSelector();
}