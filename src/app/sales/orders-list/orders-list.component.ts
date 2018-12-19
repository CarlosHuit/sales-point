import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() evShowDetail = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  getTotal = () => {
    return this.orders.map(p => p.total).reduce((acc, val) => acc + val, 0);
  }

  showDetail = (id: string) => {
    this.evShowDetail.emit(id);
  }

}
