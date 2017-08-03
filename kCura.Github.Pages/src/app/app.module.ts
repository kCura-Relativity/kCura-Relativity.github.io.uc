import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Middleware } from 'redux';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { LocalizationModule } from 'angular-l10n';

// Providers
import { BootstrapGuard } from './guards';
import * as actions from './actions';
import { JsonService } from './services/json.service';
import { GitHubApiService } from './services/github.service';
import { RepositorySearchService } from './services/repository-search.service'

// Components
import { AppComponent } from './app.component';
import { Topic, TopicItem } from './components/topic';
import { Header } from './components/header';
import { Search } from './components/search';
import { PartnerPanel, PartnerPanelItem } from './components/partner-panel';
import { Repository, RepositoryItem } from './components/repository';
import { AppRoutingModule, routedComponents } from './app-routing.module';

// Redux setup
import { IAppState, rootReducer } from './store';

@NgModule({
    imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        NgReduxModule,
        LocalizationModule.forRoot()],
    declarations: [AppComponent,
        Header,
        Search,
        Topic,
        TopicItem,
        PartnerPanel,
        PartnerPanelItem,
        Repository,
        RepositoryItem,
        routedComponents],
    providers: [
        actions.HeaderActions,
        actions.SearchActions,
        actions.AppStateActions,
        actions.RootActions,
        actions.RepositoryActions,
        BootstrapGuard,
        JsonService,
        GitHubApiService,
        RepositorySearchService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
        let middleware: Middleware[] = [];
        let enhancers = [];

        // compile-time constant created by DefinePlugin
        if (!IS_PRODUCTION) {
            if (devTools.isEnabled()) {
                enhancers.push(devTools.enhancer());
            }
        }

        ngRedux.configureStore(rootReducer, {}, middleware, enhancers);
    }
}