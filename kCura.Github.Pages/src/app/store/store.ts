import { combineReducers } from 'redux';
import * as header from "./header/header.reducer";
import * as search from "./search/search.reducer";
import * as topics from "./topics/topics.reducer";
import * as root from "./root/root.reducer";
import * as partners from './partners/partners.reducer';
import * as repositories from './repository/repository.reducer';
import * as featuredRepos from './featured-repos/featured-repos.reducer';

export interface IAppState {
    root?: root.IRootState,
    header?: header.IHeaderState,
    search?: search.ISearchState,
    topics?: topics.ITopicItem[],
    partners?: partners.IPartner[],
    repositories?: repositories.IRepositoryItem[],
    featuredRepos?: featuredRepos.IFeaturedRepo[]
}

export const rootReducer = combineReducers<IAppState>({
    root: root.rootReducer,
    header: header.headerReducer,
    search: search.searchReducer,
    topics: topics.topicsReducer,
    partners: partners.partnersReducer,
    repositories: repositories.repositoryReducer,
    featuredRepos: featuredRepos.featuredReposReducer
});
