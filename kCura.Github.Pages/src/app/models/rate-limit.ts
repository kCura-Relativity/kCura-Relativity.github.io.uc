export class Rate {
    limit: number;
    remaining: number;
    reset: number;
}

export class RateLimit {
    resources: Rate[];
    rate: Rate;
}