import { Component, Input, OnInit } from '@angular/core';
import { IExchangeInformation } from 'src/app/interfaces/exchangeinformation';


@Component({
  selector: 'app-exchange-info',
  templateUrl: './exchange-info.component.html',
  styleUrls: ['./exchange-info.component.css']
})
export class ExchangeInfoComponent implements OnInit {

  @Input() info: IExchangeInformation;

  constructor() { }

  ngOnInit(): void {

  }

}
