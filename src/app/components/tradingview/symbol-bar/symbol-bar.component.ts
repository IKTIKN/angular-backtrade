import { Component, Input, OnInit } from '@angular/core';
import { ITicker24h } from 'src/app/interfaces/ticker24h';

@Component({
  selector: 'app-symbol-bar',
  templateUrl: './symbol-bar.component.html',
  styleUrls: ['./symbol-bar.component.css']
})
export class SymbolBarComponent implements OnInit {

  @Input() ticker24h: ITicker24h;

  constructor() { }

  ngOnInit(): void {
  }

}
