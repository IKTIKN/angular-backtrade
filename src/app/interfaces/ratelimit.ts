export interface IRateLimit {
    rateLimitType: string;
    interval: string;
    intervalNum: number;
    limit: number;
}