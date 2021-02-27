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
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['symbol', 'lastPrice', 'lowPrice', 'highPrice', 'priceChange', 'priceChangePercent', 'volume'];
  dataSource = new MatTableDataSource(this.binance.tickers24h);
  

  constructor(private binance: BinanceDataService) {
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
    console.log(this.dataSource)
  }

}
