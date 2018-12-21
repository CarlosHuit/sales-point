import {Component, ViewChild, OnInit} from '@angular/core';
import { TimeInterval  } from '../../classes/time-interval';
import { OrdersService } from '../../services/orders/orders.service';
import { AuthService   } from '../../auth/auth.service';
import { Order } from '../../classes/order';
import { Router } from '@angular/router';


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  loadingSales: boolean;
  orders:       Order[];
  timeInterval: TimeInterval;
  order:        Order;

  constructor(
    private _orders:  OrdersService,
    private _auth:    AuthService,
    private _router:  Router
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
    setTimeout(
      () => (this.loadingSales = false, this._auth.showError(err)),
      1000
    );
  }

  showDetail = (id: string) => {
    const index = this.orders.findIndex(order => order._id === id);
    const el = this.orders[index];
    this.order = el;
  }

  closeOrderDetail = () => {
    delete(this.order);
  }

  restart = () => {
    delete(this.orders);
  }

}
