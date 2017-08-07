export class Repo{
    id: number;
    name: string;
    full_name: string;
    description: string;
    forks_count: number;
    stargazers_count: number;
    html_url: string;
    language: string;
    topics: string[];
    partner: string;
    authorType: string;
    pushed_at: Date;
}