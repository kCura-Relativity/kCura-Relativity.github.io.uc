import { IAppState } from "../../store";
import { StoreSelector } from "../../store/store-selector";
import { IRepositoryItemViewModel } from './repository-item';

export interface IRepositoryViewModel {
    featuredRepos: IRepositoryItemViewModel[];
    allRepos: IRepositoryItemViewModel[];
    searchResultsRepos: IRepositoryItemViewModel[];
    selectedFilter: string
}

export class RepositoryViewModelSelector extends StoreSelector<IRepositoryViewModel> {
    constructor() {
        super(['repositories', 'featuredRepos', 'search'],
            getRepositoryViewModelFromAppState);
    }
}
export function getRepositoryViewModelFromAppState(state: IAppState): IRepositoryViewModel {
    var count = 1;
    var repositories = [
        ...state.repositories.map(x => {

            let partner = state.partners.find(p => p.name.toLowerCase() === x.partner.toLowerCase());
            let isFeatured = state.featuredRepos.find(f => f.partner.toLowerCase() === x.partner.toLowerCase() && f.repository.toLowerCase() == x.name.toLowerCase());

            let repo = {
                id: x.id,
                description: x.description,
                starCount: x.stargazers_count,
                forkCount: x.forks_count,
                partner: x.partner,
                authorType: x.authorType,
                projectType: x.projectType,
                topics: x.topics,
                isFeatured: isFeatured != null ? true : false,
                html_url: x.html_url,
                full_name: x.full_name,
                name: x.name,
                version: ""
            }
            if (repo.authorType == "open source community") {
                repo.partner = "OPEN SOURCE COMMUNITY";
            }
            else if (repo.authorType == "development partners") {
                var descriptionText = repo.description.replace("Project Champion - ","");
                var endIndex = descriptionText.indexOf(":");
                if (endIndex > 0) {
                    repo.partner = descriptionText.substring(0, endIndex).toUpperCase();
                    var commaIndex = repo.partner.indexOf(",");
                    if (commaIndex > 0)
                    {
                        repo.partner = repo.partner.substring(0, commaIndex).toUpperCase();
                    }
                }
                //for (var i = 0; i < state.partners.length; i++){
                //    if (repo.description.toLowerCase().includes(state.partners[i].name.toLowerCase())) {
                //        repo.partner = state.partners[i].name;
                //        break;
                //    }

                //}
        
            }
            return repo;
        })
    ];

    var searchResults = repositories.filter(function (repo) { return state.search.repositoryIds.indexOf(repo.id) >= 0 });

    return {
        featuredRepos: repositories
            .filter(x => x.isFeatured).sort((a: IRepositoryItemViewModel, b: IRepositoryItemViewModel) => { return a.forkCount - b.forkCount }),
        allRepos: repositories.filter(x => !x.isFeatured),
        searchResultsRepos: searchResults,
        selectedFilter: ""
    };
}

export function toLower(value: string): string {
    return value.toLowerCase();
}