import {Component, ViewChild, OnInit} from '@angular/core';
import { TimeInterval } from '../../classes/time-interval';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})

export class OrdersComponent implements OnInit {

  constructor() {
  }

  ngOnInit () {
  }

  search = (dates: TimeInterval) => {
    console.log(dates);
  }

}
