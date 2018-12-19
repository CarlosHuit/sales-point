import {Component, ViewChild, OnInit} from '@angular/core';
import { TimeInterval } from '../../classes/time-interval';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})

export class OrdersComponent implements OnInit {

  loadingSales: boolean;

  constructor() { }

  ngOnInit () { }


  searchByInterval = (dates: TimeInterval) => {
    this.loadingSales = true;
    console.log(dates);
  }


}
