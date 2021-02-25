import { IRateLimit } from "./ratelimit";
import { ISymbol } from "./symbol";

export interface IExchangeInformation {
    timezone: string;
    serverTime: number;
    rateLimits: IRateLimit[];
    exchangeFilters: any[];
    symbols: ISymbol[];
}