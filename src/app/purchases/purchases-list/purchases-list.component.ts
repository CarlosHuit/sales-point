import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../classes/order';
import { TimeInterval } from '../../classes/time-interval';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.css']
})
export class PurchasesListComponent implements OnInit {


  columns = ['No.', 'Fecha', 'Proveedor', 'Total Compra'];

  @Input() orders: Order[];
  @Input() timeInterval: TimeInterval[] | any;
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
