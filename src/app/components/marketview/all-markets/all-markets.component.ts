import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITicker24h } from 'src/app/interfaces/ticker24h';
import { BinanceDataService } from 'src/app/services/binance-data.service';

@Component({
  selector: 'app-all-markets',
  templateUrl: './all-markets.component.html',
  styleUrls: ['./all-markets.component.css']
})
export class AllMarketsComponent implements AfterViewInit {
  @Input() showPaginator: boolean;
  @Input() displayedColumns: string[];
  @Input() tickers: ITicker24h[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<ITicker24h>(this.setQuoteMarkets(this.binance.selectedQuoteMarket, this.binance.tickers24h));
  
  constructor(public binance: BinanceDataService) {
  }

  onMarketChange(e: any) {
    console.log(e.value)
    this.dataSource = new MatTableDataSource<ITicker24h>(this.setQuoteMarkets(e.value, this.binance.tickers24h));
    this.dataSource.sort = this.sort;
  }

  setQuoteMarkets(quoteAsset: string, tickers: ITicker24h[]): ITicker24h[] {
    let quoteTickers: ITicker24h[] = [];
    tickers.forEach(ticker => {
      if (ticker.symbol.substr(ticker.symbol.length-quoteAsset.length) === quoteAsset) {
        quoteTickers.push(ticker);
      }
    });
    return quoteTickers;
  }

  setupFilter(column: string) {
    this.dataSource.filterPredicate = (data: ITicker24h, filter: string) => {
      const textToSearch = data[column] && data[column].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
