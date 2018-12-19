import {Component, ViewChild, OnInit} from '@angular/core';
import { TimeInterval  } from '../../classes/time-interval';
import { OrdersService } from '../../services/orders/orders.service';
import { AuthService   } from '../../auth/auth.service';
import { Order } from '../../classes/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})

export class OrdersComponent implements OnInit {

  loadingSales: boolean;
  orders: Order[];
  timeInterval: TimeInterval;

  constructor(
    private _orders:  OrdersService,
    private _auth:    AuthService,
    ) { }

  ngOnInit () { }


  searchByInterval = (dates: TimeInterval) => {
    this.loadingSales = true;
    this.timeInterval = dates;
    this._orders.getOrders(dates)
      .subscribe( this.getOrdersSucces, this.getOrdersError );
  }

  getOrdersSucces = (res: any) => {
    setTimeout(() => {
      console.log(res);

      if (res.orders.length > 0) {
        this.orders = res.orders;
        this.loadingSales = false;
      }

      if (res.orders.length === 0) {
        this.loadingSales = false;
        this._auth.showError(res.message);
      }

    }, 1000);
  }

  getOrdersError = (err: string) => {
    setTimeout(() => {
      this.loadingSales = false;
      this._auth.showError(err);
      console.log(err);
    }, 1000);
  }


}
