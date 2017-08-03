import { IAppState } from "../../../store";
import { StoreSelector } from "../../../store/store-selector";

export interface IRepositoryItemViewModel {
    id: number;
    name: string;
    description: string;
    starCount: number;
    forkCount: number;
    partner: string;
    version: string;
    authorType: string;
    projectType: string;
    topics: string[];
    isFeatured: boolean;
    html_url: string;
    full_name: string;
}