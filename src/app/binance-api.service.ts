import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BinanceApiService {

  private baseUrl = 'https://api.binance.com';

  // url = 'assets/candlestickdata/btcusdt5m.json';
  // testUrl = 'assets/candlestickdata/LTCUSDT_1d.json';

  constructor(private http: HttpClient) { }

  /**
   * GET /api/v3/ping
   * @summary Test connectivity to the Rest API. Weight: 1
   */
  pingBinance(): Observable<IPing> {
    const requestUrl = '/api/v3/ping';
    return this.http.get<IPing>(this.baseUrl + requestUrl);
  }


  /**
   * GET /api/v3/time 
   * @summary Test connectivity to the Rest API and get the current server time. Weight: 1
   */
  getServerTime(): Observable<IServerTime> {
    const requestUrl = '/api/v3/time';
    return this.http.get<IServerTime>(this.baseUrl + requestUrl);
  }


  /**
   * GET /api/v3/exchangeInfo 
   * @summary Current exchange trading rules and symbol information. Weight: 1
   */
  getExchangeInformation(): Observable<IExchangeInformation> {
    const requestUrl = '/api/v3/exchangeInfo';
    return this.http.get<IExchangeInformation>(this.baseUrl + requestUrl);
  }


  /**
   * GET /api/v3/depth
   * @summary Order Book. Weight: [ limit<100 = 1, limit: 50 = 5, limit: 1000 = 10, limit: 5000 = 50 ]
   * @param symbol Marketsymbol.
   * @param limit  Valid limits: [ 5, 10, 20, 50, 100, 500, 1000, 5000 ]
   */
  getOrderBook(symbol: string, limit: number): Observable<IOrderBook> {
    const requestUrl = `/api/v3/depth?symbol=${symbol}&limit=${limit}`;
    return this.http.get<IOrderBook>(this.baseUrl + requestUrl);
  }


  /**
   * GET /api/v3/aggTrades?symbol
   * @summary Get compressed, aggregate trades. Trades that fill at the time, from the same order, 
   * with the same price will have the quantity aggregated. Weight: 1
   * @param symbol Marketsymbol.
   */
  getAggregateTrades(symbol: string): Observable<IAggregateTrade> {
    const requestUrl = `/api/v3/aggTrades?symbol=${symbol}&limit=1000`;
    return this.http.get<IAggregateTrade>(this.baseUrl + requestUrl);
  }


  /**
   * GET /api/v3/trades?symbol
   * @summary Get recent trades. Weight: 1
   * @param symbol Marketsymbol.
   */
  getRecentTrades(symbol: string): Observable<IRecentTrades> {
    const requestUrl = `/api/v3/trades?symbol=${symbol}&limit=500`;
    return this.http.get<IRecentTrades>(this.baseUrl + requestUrl);
  }


  /**
   * GET /api/v3/klines 
   * @summary        Kline/candlestick bars for a symbol.
   * Klines are uniquely identified by their open time. Weight: 1
   * @param symbol   Marketsymbol.
   * @param interval Candlestick time interval.
   */
  getCandlestickData(symbol: string, interval: string): Observable<ICandlestick[]> {
    const requestUrl = `/api/v3/klines?limit=1000&interval=${interval}&symbol=${symbol}`;
    return this.http.get<ICandlestick[]>(this.baseUrl + requestUrl);
  }


  /**
   * GET /api/v3/avgPrice?symbol
   * @summary      Current average price for a symbol. Weight: 1
   * @param symbol Marketsymbol.
   */
  getCurrentAveragePrice(symbol: string): Observable<IAveragePrice> {
    const requestUrl = `/api/v3/avgPrice?symbol=${symbol}`;
    return this.http.get<IAveragePrice>(this.baseUrl + requestUrl);
  }

  /**
   * GET /api/v3/ticker/price?symbol
   * @summary      Latest price for a symbol. Weight: 1
   * @param symbol Marketsymbol.
   */
  getTicker(symbol: string): Observable<ITicker> {
    const requestUrl = `/api/v3/ticker/price?symbol=${symbol}`;
    return this.http.get<ITicker>(this.baseUrl + requestUrl);
  }


  /**
   * GET /api/v3/ticker/price?symbol
   * @summary Latest price for all symbols. Weight: 2
   */
  getAllTickers(): Observable<ITicker[]> {
    const requestUrl = '/api/v3/ticker/price';
    return this.http.get<ITicker[]>(this.baseUrl + requestUrl);
  }


  /**
   * GET /api/v3/ticker/24hr?symbol
   * @summary      24 hour rolling window price change statistics. Weight: 1
   * @param symbol Marketsymbol.
   */
  get24hTicker(symbol: string): Observable<ITicker24h> {
    const requestUrl = `/api/v3/ticker/24hr?symbol=${symbol}`;
    return this.http.get<ITicker24h>(this.baseUrl + requestUrl);
  }


  /**
   * GET /api/v3/ticker/24hr
   * @summary 24 hour rolling window price change statistics. Weight: 40
   */
  getAll24hTickers(symbol: string): Observable<ITicker24h[]> {
    const requestUrl = `/api/v3/ticker/24hr?symbol=${symbol}`;
    return this.http.get<ITicker24h[]>(this.baseUrl + requestUrl);
  }


  /**
   * GET api/v3/ticker/bookTicker?symbol
   * @summary      Best price/qty on the order book for a symbol. Weight: 1
   * @param symbol Marketsymbol
   */
  getBookTicker(symbol: string): Observable<IBookTicker>  {
    const requestUrl = `/api/v3/ticker/bookTicker?symbol=${symbol}`;
    return this.http.get<IBookTicker>(this.baseUrl + requestUrl);
  }


  /**
   * GET api/v3/ticker/bookTicker
   * @summary Best price/qty on the order book for all symbols. Weight: 2
   */
  getAllBookTickers(): Observable<IBookTicker[]>  {
    const requestUrl = `/api/v3/ticker/bookTicker`;
    return this.http.get<IBookTicker[]>(this.baseUrl + requestUrl);
  }


}


export interface IPing {
}


export interface IServerTime {
  serverTime: number;
}


export interface IRateLimit {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
}


export interface IFilter {
  filterType: string;
  minPrice: string;
  maxPrice: string;
  tickSize: string;
  multiplierUp: string;
  multiplierDown: string;
  avgPriceMins?: number;
  minQty: string;
  maxQty: string;
  stepSize: string;
  minNotional: string;
  applyToMarket?: boolean;
  limit?: number;
  maxNumOrders?: number;
  maxNumAlgoOrders?: number;
}


export interface ISymbol {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: string[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: IFilter[];
  permissions: string[];
}


export interface IExchangeInformation {
  timezone: string;
  serverTime: number;
  rateLimits: IRateLimit[];
  exchangeFilters: any[];
  symbols: Symbol[];
}


export interface IOrderBook {
  lastUpdateId: number;
  bids: string[][];
  asks: string[][];
}


export interface IAggregateTrade {
  a: number;
  p: string;
  q: string;
  f: number;
  l: number;
  T: any;
  m: boolean;
  M: boolean;
}


export interface IRecentTrades {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: any;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}


export interface ICandlestick {
  openTime: number,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  closeTime: number,
  quoteAssetVolume: string,
  trades: number,
  takerBuyBaseAssetVolume: string,
  takerBuyQuoteAssetVolume: string,
  ignore: string
}


export interface IAveragePrice {
  mins: number;
  price: string;
}


export interface ITicker {
  symbol: string;
  price: string;
}


export interface ITicker24h {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}


export interface IBookTicker {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}

