import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../classes/order';
import { TimeInterval } from '../../classes/time-interval';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  columns = ['No.', 'Fecha', 'Cliente', 'Total Venta'];

  @Input() orders: Order[];
  @Input() timeInterval: TimeInterval[];

  constructor() { }

  ngOnInit() {
    console.log(this.timeInterval);
  }

  getTotal = () => {
    return this.orders.map(p => p.total).reduce((acc, val) => acc + val, 0);
  }

}
